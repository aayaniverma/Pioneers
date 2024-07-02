import pandas as pd
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

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

# Function to find problem and return solutions
def find_problem_and_solution(input_text):
    input_text_lower = input_text.lower().strip()
    
    for index, row in data.iterrows():
        symptoms_list = eval(row['Symptoms'])
        for symptom in symptoms_list:
            if symptom.lower() in input_text_lower:
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
