from .client import EnviaClient


class RateService:

    @staticmethod
    def get_rates(payload):

        client = EnviaClient()

        response = client.post("/ship/rate/", payload)

        return response