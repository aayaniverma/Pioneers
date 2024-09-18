using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;
using Azure;
using Azure.AI.OpenAI;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using iText.Kernel.Pdf.Canvas.Parser.Listener;
using Microsoft.CognitiveServices.Speech;

namespace DotNetConf.Controllers
{
    public class ChatController : Controller
    {
        // Get environment variables
        string endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT");
        string key = Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY");
        string model = Environment.GetEnvironmentVariable("AZURE_OPENAI_MODEL");
        string speechApiKey = Environment.GetEnvironmentVariable("AZURE_SPEECH_KEY");
        string speechRegion = Environment.GetEnvironmentVariable("AZURE_SPEECH_REGION");

        private static readonly Dictionary<string, string> YoutubeLinks = new Dictionary<string, string>
        {
            { "rattling noise", "https://youtu.be/Yeb7zft_79k?si=rbNjXzxdp0s61KxJ" },
            { "brake", "https://www.youtube.com/watch?v=example2" },
            { "transmission", "https://www.youtube.com/watch?v=example3" }
        };
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetResponse(string userMessage)
        {
            OpenAIClient client = new OpenAIClient(new Uri(endpoint), new AzureKeyCredential(key));

            var chatCompletionsOptions = new ChatCompletionsOptions()
            {
                Messages = {
            new ChatMessage(ChatRole.System, "You are a helpful assistant specialized in car issues. All user queries are related to cars."),
            new ChatMessage(ChatRole.User, userMessage)
        },
                MaxTokens = 100
            };

            Response<ChatCompletions> response = await client.GetChatCompletionsAsync(model, chatCompletionsOptions);

            var botResponse = response.Value.Choices.First().Message.Content;

            // Add debugging output
            Console.WriteLine("User Message: " + userMessage);
            Console.WriteLine("Bot Response before adding YouTube links: " + botResponse);

            // Check for keywords and append YouTube links if necessary
            bool linkAdded = false;
            foreach (var keyword in YoutubeLinks.Keys)
            {
                if (userMessage.Contains(keyword, StringComparison.OrdinalIgnoreCase))
                {
                    botResponse += $"\n\nFor more information, check out this video: {YoutubeLinks[keyword]}";
                    linkAdded = true;
                    break; // Append only one link based on the first keyword match
                }
            }

            // Add debugging output
            Console.WriteLine("Bot Response after adding YouTube links: " + botResponse);

            return Json(new { response = botResponse });
        }


        [HttpPost]
        public async Task<IActionResult> GetResponseFromCsv(string userMessage)
        {
            OpenAIClient client = new OpenAIClient(new Uri(endpoint), new AzureKeyCredential(key));

            string csvFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "sorted_maindata.csv");
            var problemSolutions = LoadCsvData(csvFilePath);

            var csvContext = new StringBuilder();
            foreach (var item in problemSolutions.Take(5))
            {
                csvContext.AppendLine($"Problem: {item.ProblemName}\nSymptoms: {item.Symptoms}\nSolution: {item.Solution}\n");
            }

            string prompt = $@"
You are a helpful assistant specialized in car issues. Based on the following information from a CSV file, provide a response to the user message.

CSV Data (first 5 problems shown):
{csvContext.ToString()}

User Message: {userMessage}
";

            var chatCompletionsOptions = new ChatCompletionsOptions()
            {
                Messages = {
                    new ChatMessage(ChatRole.System, "You are a helpful assistant specialized in car issues. All user queries are related to cars."),
                    new ChatMessage(ChatRole.User, prompt)
                },
                MaxTokens = 400,
                Temperature = (float?)0.5
            };

            Response<ChatCompletions> response = await client.GetChatCompletionsAsync(model, chatCompletionsOptions);

            var botResponse = response.Value.Choices.First().Message.Content;

            return Json(new { Response = botResponse });
        }

        [HttpPost]
        public async Task<IActionResult> GetResponseFromPdf(string userMessage)
        {
            OpenAIClient client = new OpenAIClient(new Uri(endpoint), new AzureKeyCredential(key));
            string pdfText = GetText(Path.Combine(Directory.GetCurrentDirectory(), "Data", "punch.pdf"));

            string trimmedPdfText = pdfText.Length > 3000 ? pdfText.Substring(0, 3000) : pdfText;

            var chatCompletionsOptions = new ChatCompletionsOptions()
            {
                Messages = {
                    new ChatMessage(ChatRole.System, "You are a helpful assistant specialized in car issues. All information provided is related to cars."),
                    new ChatMessage(ChatRole.User, $"The following information is from the PDF text: {trimmedPdfText}"),
                    new ChatMessage(ChatRole.User, userMessage)
                },
                MaxTokens = 300,
                Temperature = 0
            };

            Response<ChatCompletions> response = await client.GetChatCompletionsAsync(model, chatCompletionsOptions);

            var botResponse = response.Value.Choices.First().Message.Content;

            return Json(new { Response = botResponse });
        }

        [HttpPost]
        public async Task<IActionResult> SpeechToText()
        {
            var speechConfig = SpeechConfig.FromSubscription(speechApiKey, speechRegion);

            // Remove AudioConfig and use only SpeechRecognizer
            using var recognizer = new SpeechRecognizer(speechConfig);
            var result = await recognizer.RecognizeOnceAsync();

            if (result.Reason == ResultReason.RecognizedSpeech)
            {
                return Json(new { Text = result.Text });
            }
            else
            {
                return Json(new { Error = result.Reason });
            }
        }

        [HttpPost]
        public async Task<IActionResult> TextToSpeech(string text)
        {
            var speechConfig = SpeechConfig.FromSubscription(speechApiKey, speechRegion);

            // Remove AudioConfig and use only SpeechSynthesizer
            using var synthesizer = new SpeechSynthesizer(speechConfig);
            var result = await synthesizer.SpeakTextAsync(text);

            if (result.Reason == ResultReason.SynthesizingAudioCompleted)
            {
                return Json(new { Status = "Success" });
            }
            else
            {
                return Json(new { Error = result.Reason });
            }
        }


        private static List<ProblemSolution> LoadCsvData(string filePath)
        {
            var problemSolutions = new List<ProblemSolution>();

            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
            {
                problemSolutions = csv.GetRecords<ProblemSolution>().ToList();
            }

            return problemSolutions;
        }

        private static string GetText(string pdfFilePath)
        {
            PdfDocument pdfDoc = new PdfDocument(new PdfReader(pdfFilePath));
            StringBuilder text = new StringBuilder();

            for (int page = 1; page <= pdfDoc.GetNumberOfPages(); page++)
            {
                PdfPage pdfPage = pdfDoc.GetPage(page);
                ITextExtractionStrategy strategy = new SimpleTextExtractionStrategy();
                string currentText = PdfTextExtractor.GetTextFromPage(pdfPage, strategy);
                text.Append(currentText);
            }
            pdfDoc.Close();
            return text.ToString();
        }
    }

    public class ProblemSolution
    {
        public string ProblemName { get; set; }
        public string Symptoms { get; set; }
        public string Solution { get; set; }
        public string Step2 { get; set; }
        public string Step3 { get; set; }
        public string Step4 { get; set; }
    }
}
