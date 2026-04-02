#!/usr/bin/env python3
"""
Script to complete missing translations in language files.
This script compares the English translation file with other language files
and identifies missing keys that need to be translated.
"""

import json
import os
from pathlib import Path

def load_json(filepath):
    """Load JSON file safely."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return {}

def get_all_keys(obj, prefix=''):
    """Recursively get all keys from a nested dictionary."""
    keys = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            full_key = f"{prefix}.{k}" if prefix else k
            if isinstance(v, dict):
                keys.extend(get_all_keys(v, full_key))
            else:
                keys.append(full_key)
    return keys

def main():
    locales_dir = Path('src/locales')
    en_file = locales_dir / 'en.json'
    
    if not en_file.exists():
        print(f"English translation file not found: {en_file}")
        return
    
    en_data = load_json(en_file)
    en_keys = set(get_all_keys(en_data))
    
    print(f"Total keys in English: {len(en_keys)}\n")
    
    # Check other language files
    language_files = {
        'hi': 'Hindi',
        'te': 'Telugu',
        'ml': 'Malayalam',
        'kn': 'Kannada',
        'ta': 'Tamil'
    }
    
    for lang_code, lang_name in language_files.items():
        lang_file = locales_dir / f'{lang_code}.json'
        if not lang_file.exists():
            print(f"⚠️  {lang_name} ({lang_code}.json) not found")
            continue
        
        lang_data = load_json(lang_file)
        lang_keys = set(get_all_keys(lang_data))
        
        missing_keys = en_keys - lang_keys
        
        if missing_keys:
            print(f"❌ {lang_name} ({lang_code}.json): {len(missing_keys)} missing keys")
            # Show first 5 missing keys
            for key in sorted(list(missing_keys))[:5]:
                print(f"   - {key}")
            if len(missing_keys) > 5:
                print(f"   ... and {len(missing_keys) - 5} more")
        else:
            print(f"✅ {lang_name} ({lang_code}.json): Complete")
        print()

if __name__ == '__main__':
    main()

