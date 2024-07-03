import pandas as pd
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
import spacy
from nltk.corpus import wordnet
import nltk

# Download NLTK's WordNet if not already downloaded
nltk.download('wordnet')

# Load Spacy model
nlp = spacy.load('en_core_web_sm')

# Load the dataset (for tokenization purposes)
data = pd.read_csv('/Users/diya/tata/Tata-InnoVent/test/output.csv')

# Initialize tokenizer and model
model_name = 'gpt2'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Load the trained checkpoint
checkpoint_path = 'model_checkpoint_epoch_2.pt'
model.load_state_dict(torch.load(checkpoint_path))
model.eval()

# Function to generate response based on input symptoms
def generate_solution(input_text):
    input_ids = tokenizer.encode(input_text, return_tensors='pt', max_length=512, truncation=True)
    attention_mask = torch.ones_like(input_ids)
    
    output = model.generate(input_ids=input_ids, attention_mask=attention_mask, max_length=100, num_return_sequences=1)
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_text

# Function to get synonyms
def get_synonyms(word):
    synonyms = set()
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            synonyms.add(lemma.name().replace('_', ' '))
    return synonyms

# Function to find problem and return solutions
def find_problem_and_solution(input_text):
    input_text_lower = input_text.lower().strip()
    
    # Tokenize and lemmatize input_text using Spacy
    doc = nlp(input_text_lower)
    input_tokens = [token.lemma_ for token in doc]
    
    for index, row in data.iterrows():
        symptoms_list = eval(row['Symptoms'])
        for symptom in symptoms_list:
            symptom_lower = symptom.lower()
            symptom_doc = nlp(symptom_lower)
            symptom_tokens = [token.lemma_ for token in symptom_doc]
            
            # Check for matches between input tokens and symptom tokens
            if any(token in input_tokens or token in get_synonyms(token) for token in symptom_tokens):
                return row['Problem'], row['Solutions']
    
    return None, None

# Interactive user input loop
def main():
    print("Welcome to Car Troubleshooting Chatbot. Enter 'exit' to quit.")
    
    while True:
        symptoms = input("\nEnter symptoms (e.g., 'Engine Issues: Poor performance, knocking noises'):\n> ")
        
        if symptoms.lower() == 'exit':
            break
        
        problem, solutions = find_problem_and_solution(symptoms)
        
        if problem:
            print(f"\nIdentified Problem: {problem}")
            print(f"Suggested Solutions:")
            for i, solution in enumerate(eval(solutions)):
                print(f"{i+1}. {solution}")
        else:
            print("\nNo specific problem identified. Please provide more details or try again.")

if __name__ == "__main__":
    main()
