import pandas as pd
from transformers import AutoTokenizer, GPT2LMHeadModel, GPT2Tokenizer, AdamW
import torch

data = pd.read_csv('/content/sample_data/output.csv')

print(data.head())


tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")


def tokenize_text(text):
    return tokenizer.encode(text, return_tensors='pt')


data['input_tokens'] = data['Symptoms'].apply(lambda x: tokenize_text(" ".join(eval(x))))
data['response_tokens'] = data['Solutions'].apply(lambda x: tokenize_text(" ".join(eval(x))))

print(data.head())
print(data.shape)

model_name = 'gpt2'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Prepare the data 
train_data = []
for i, row in data.iterrows():
    input_ids = tokenizer.encode(row['Symptoms'], return_tensors='pt', truncation=True, max_length=512)
    response_ids = tokenizer.encode(row['Solutions'], return_tensors='pt', truncation=True, max_length=512)
    
    # Concatenate input and response tokens
    input_tokens = torch.cat([input_ids, response_ids], dim=-1)
    
    # Create labels, ensuring same length as input_tokens
    labels = torch.cat([input_ids, response_ids], dim=-1)
    
    train_data.append((input_tokens, labels))

#  training parameters
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
optimizer = AdamW(model.parameters(), lr=5e-5)

# Training loop
model.train()
for epoch in range(3):  # Adjust the number of epochs as needed
    for input_tokens, labels in train_data:
        input_tokens = input_tokens.to(device)
        labels = labels.to(device)

        
        outputs = model(input_ids=input_tokens, labels=labels)
        loss = outputs.loss

        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        print(f'Epoch: {epoch}, Loss: {loss.item()}')
