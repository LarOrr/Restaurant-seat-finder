import requests
import sys
import json

__site = 'http://localhost:5000'


def test_patch():
    dict = {
        'free_seats': 20
    }
    return requests.patch(__site + '/places/1', json=json.dumps(dict))


if __name__ == '__main__':
    try:
        response = test_patch()
        # response = globals()[sys.argv[1]]()
    except KeyError:
        print("No such value")
        sys.exit(1)

    print(f'status code: {response.status_code}\n')
    print('headers: \n')
    for header in response.headers:
        print(f'    {header}: {response.headers[header]}\n')
    print(f'content:\n{response.content}')
