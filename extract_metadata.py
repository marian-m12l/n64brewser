#!/usr/bin/env python3
import os
import json
import re

path = './N64-homebrew-archive-sorted'

z64_files = []
for root, dir_names, file_names in os.walk(path):
    for f in file_names:
        z64_files.append(os.path.join(root, f))

metadata = []
for path in z64_files:
    split = path.split('/')
    filename = split[len(split)-1]
    if filename.startswith('.') or not filename.endswith('.z64'):
        continue
    data = {}
    data['path'] = path[2:]
    data['filename'] = filename
    category = split[3].split(' - ')[1]
    data['category'] = category
    if category == 'GAMES':
        subcategory = split[4].split(' - ')[1]
        data['type'] = subcategory
        pass
    elif category == 'JAM':
        m = re.search('[0-9] - ([0-9]{4})', split[len(split)-2])
        if m:
            year = m.group(1)
            data['year'] = year
            data['event'] = 'N64brew Game Jam ' + year
        pass
    elif category == 'BETA':
        subcategory = split[4].split(' - ')[1]
        data['type'] = subcategory
        pass
    elif category == 'MEDIA':
        subcategory = split[4].split(' - ')[1]
        data['type'] = subcategory
        pass
    elif category == 'DEMO':
        subcategory = split[4].split(' - ')[1]
        if subcategory == 'DEMO':
            m = re.search('\\[([0-9]{4})\\]', split[len(split)-2])
            if m:
                year = m.group(1)
                data['year'] = year
            democategory = split[5].split(' - ')[1]
            if democategory == 'EVENT':
                m = re.search('\\[([0-9]{4})\\] (.*)', split[len(split)-2])
                if m:
                    event = m.group(2)
                    data['event'] = event
        elif subcategory == 'TECH':
            pass
    metadata.append(data)

print(json.dumps(metadata, indent=2))