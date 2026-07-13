import requests

from django.conf import settings

from .exceptions import EnviaAPIException


class EnviaClient:

    def __init__(self):

        self.base_url = settings.ENVIA_BASE_URL.rstrip("/")

        self.headers = {
            "Authorization": f"Bearer {settings.ENVIA_API_KEY}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

    def post(self, endpoint, payload):

        response = requests.post(
            f"{self.base_url}/{endpoint.lstrip('/')}",
            json=payload,
            headers=self.headers,
            timeout=60,
        )

        if not response.ok:
            raise EnviaAPIException(
                f"Envia Error ({response.status_code}): {response.text}"
            )

        return response.json()

    def get(self, endpoint):

        response = requests.get(
            f"{self.base_url}/{endpoint.lstrip('/')}",
            headers=self.headers,
            timeout=60,
        )

        if not response.ok:
            raise EnviaAPIException(
                f"Envia Error ({response.status_code}): {response.text}"
            )

        return response.json()