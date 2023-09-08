from bs4 import BeautifulSoup
import requests

url = 'https://byjus.com/english/5-letter-words/'
page = requests.get(url)
soup = BeautifulSoup(page.text, 'html')
table = soup.find_all('td')
words = []

def appendWords():
    for word in table:
        if word.text == 'Voice':
            words.append(word.text)
            break
        else:
            words.append(word.text)

appendWords()
print(words)