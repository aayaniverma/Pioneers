import pandas as pd
from transformers import AutoTokenizer, GPT2LMHeadModel, GPT2Tokenizer, AdamW
import torch

# Load the dataset
data = pd.read_csv('/Users/diya/testata/output.csv')

# Initialize tokenizer
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")

# Tokenize text
def tokenize_text(text):
    return tokenizer.encode(text, return_tensors='pt')

data['input_tokens'] = data['Symptoms'].apply(lambda x: tokenize_text(" ".join(eval(x))))
data['response_tokens'] = data['Solutions'].apply(lambda x: tokenize_text(" ".join(eval(x))))

# Prepare the model
model_name = 'gpt2'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Check if there are existing checkpoints
import os
checkpoint_path = 'model_checkpoint_epoch_2.pt'  # Adjust this based on your checkpoints

if os.path.exists(checkpoint_path):
    # Load the existing checkpoint
    model.load_state_dict(torch.load(checkpoint_path))
    print(f'Loaded checkpoint from {checkpoint_path}')
else:
    print(f'No checkpoint found at {checkpoint_path}. Training from scratch.')

# Prepare the data 
train_data = []
for i, row in data.iterrows():
    input_ids = tokenizer.encode(row['Symptoms'], return_tensors='pt', truncation=True, max_length=512)
    response_ids = tokenizer.encode(row['Solutions'], return_tensors='pt', truncation=True, max_length=512)
    
    input_tokens = torch.cat([input_ids, response_ids], dim=-1)
    labels = torch.cat([input_ids, response_ids], dim=-1)
    
    train_data.append((input_tokens, labels))

# Training parameters
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
optimizer = AdamW(model.parameters(), lr=5e-5)

# Training loop with improvements
model.train()
epochs = 3
print_every = 10  # Print loss every 10 batches

for epoch in range(epochs):
    total_loss = 0
    for step, (input_tokens, labels) in enumerate(train_data):
        input_tokens = input_tokens.to(device)
        labels = labels.to(device)
        
        outputs = model(input_ids=input_tokens, labels=labels)
        loss = outputs.loss
        total_loss += loss.item()
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        if (step + 1) % print_every == 0:
            print(f'Epoch: {epoch}, Step: {step + 1}, Loss: {total_loss / print_every}')
            total_loss = 0
    
    # Save model checkpoint after each epoch
    torch.save(model.state_dict(), f'model_checkpoint_epoch_{epoch}.pt')

print('Training complete.')
