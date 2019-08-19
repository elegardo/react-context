import os
import requests
import json

# Ingresar a https://developer.marvel.com/ para obtener apiKey
# Ver documentacion para calcular hash
ts = 1
apikey = '{apikey}'
hash = '{hash}'

auth = 'ts={}&apikey={}&hash={}'.format(ts, apikey, hash)

url = 'https://gateway.marvel.com:443/v1/public/characters?{}{}'

total = 15 # Calculo de iteraciones necesarias para obtener toda la data
collector = []
offset = 0
multiple = 100
params = ''

for x in range(0, total):
	offset = x * multiple + 1

	if(offset==1):
		params = '&limit={}'.format(multiple)
	else:
		params = '&offset={}&limit={}'.format(offset, multiple)

	print(params)

	data = requests.get(url.format(auth, params)).json()

	for res in data['data']['results']:
		item = {
			"key":   res['id'], 
			"text":  res['name'], 
			"value": res['id'], 
			"image": { "avatar": "true", 
					    "src": res['thumbnail']['path'] +'.'+ res['thumbnail']['extension']
					 }
		}
		collector.append(item.copy())
		print(item)

	print("")

with open('../src/hooks/marvel/options.json', 'w') as outfile:
	json.dump(collector, outfile, sort_keys=False, indent=4)
