import pypdf
import json
import os
import re

SHIFTED_FONTS = {
    '/IDXWHN+TimesNewRomanPSMT',
    '/FBOERT+TimesNewRomanPS-ItalicMT',
    '/EXZYDV+TimesNewRomanPS-BoldMT',
    '/WLYCVL+TimesNewRomanPS-BoldItalicMT',
}

def decode_char(ch):
    c = ord(ch)
    if ch == '¿':
        return 'fi'
    if ch == 'À':
        return 'fl'
    # Shifted characters
    return chr(c + 29)

def extract_clean_page(page):
    chunks = []
    def visitor(text, cm, tm, font_dict, font_size):
        if not text:
            return
        fname = font_dict.get('/BaseFont', '') if font_dict else ''
        if fname in SHIFTED_FONTS:
            decoded = ''.join(decode_char(ch) for ch in text)
            chunks.append(decoded)
        else:
            chunks.append(text)
    page.extract_text(visitor_text=visitor)
    return ''.join(chunks)

def main():
    reader = pypdf.PdfReader('book.pdf')
    total = len(reader.pages)
    print(f'Total pages in book.pdf: {total}')
    
    pages_text = {}
    for i in range(total):
        txt = extract_clean_page(reader.pages[i])
        pages_text[i + 1] = txt
        
    with open('extracted_pages.json', 'w', encoding='utf-8') as f:
        json.dump(pages_text, f, ensure_ascii=False, indent=2)
        
    print('Extracted and saved extracted_pages.json!')
    
    # Print sample of page 7, 8, 9, 13, 18
    for p in [7, 8, 9, 13, 18, 58, 88, 106]:
        print(f'=== DECODED PAGE {p} ===')
        print(pages_text.get(p, '')[:300])

if __name__ == '__main__':
    main()
