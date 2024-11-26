let result = await session.prompt(`{
    "sentence": "The children played in the backyard until sunset.",
    "contexts": ["education", "health", "family"]
}`)

/* Response:
'{\n    "context_scores": {\n        "education": 0.00,\n        "health": 0.00,\n        "family": 0.50\n    },\n    "explanation": "The sentence describes children playing outside, which is a typical family activity."\n}'
*/


result = await session.prompt(`{
    "sentence": "The flowers bloomed early this spring.",
    "contexts": ["environment", "science", "agriculture"]
}`)

/* Response:
'{\n    "context_scores": {\n        "environment": 1.00,\n        "science": 0.25,\n        "agriculture": 0.75\n    },\n    "explanation": "The sentence describes a natural phenomenon related to the environment (early blooming) and is supported by scientific knowledge of plant growth."\n}'
*/