
# Basic rule class definition
class Rule:
    def __init__(self, name, condition, action):
        self.name = name
        self.condition = condition 
        self.action = action

    def evaluate(self, context):
        if self.condition(context):
            return self.action(context)
        return None

    def __str__(self):
        return f"Rule: {self.name}"