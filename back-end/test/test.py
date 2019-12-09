import requests
import sys
import json

__site = 'http://localhost:5000'


def test_patch():
    dict = {
        'free_seats': 19,
        'name': 'TEST333',
        'address': {'street': 'NEWNEWNEW', 'str222': None}
    }
    return requests.patch(__site + '/places/1', json=dict)

def test_post():
    dict = {'name': 'TEST222', 'address':
        {'street': 'Coolstraat', 'house_number': '2', 'postcode': '9321CV', 'city': 'Groningen', 'country': 'Netherlands'},
     'total_seats': 20, 'free_seats': 0}
    return requests.post(__site + '/places', json=dict)

if __name__ == '__main__':
    try:
        response = test_post()
        # response = globals()[sys.argv[1]]()
    except KeyError:
        print("No such value")
        sys.exit(1)

    print(f'status code: {response.status_code}\n')
    print('headers: \n')
    for header in response.headers:
        print(f'    {header}: {response.headers[header]}\n')
    print(f'content:\n{response.content}')
