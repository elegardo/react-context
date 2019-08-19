import os
import requests
import json

url = 'http://api.tvmaze.com/shows?page={}'

total = 171 # Calculo de iteraciones necesarias para obtener toda la data
collector = []
rating = 7.0 # Filtra series con mejor ranking porque tienen mejor data y mas completa

for page in range(0, total):

	print('page={}'.format(page))

	data = requests.get(url.format(page)).json()

	for res in data:
		average = res['rating']['average'] 
		if average is not None and float(average) > rating:
			item = {
				"key":   res['id'], 
				"text":  res['name'], 
				"value": res['id'], 
				"image": { "avatar": "false" if res['image'] is None else "true", 
						    "src": "" if res['image'] is None else res['image']['medium']
						 }
			}
			collector.append(item.copy())
			print(item)

	print("")

with open('../src/hooks/tvshow/options.json', 'w') as outfile:
	json.dump(collector, outfile, sort_keys=False, indent=4)
