import ast
import operator
from typing import Dict, Any

class CalcTool:
    """
    Deterministic Calculation Tool.
    Safely computes mathematical formulas without relying on LLM arithmetic hallucination.
    """

    ALLOWED_OPERATORS = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.Pow: operator.pow,
        ast.USub: operator.neg,
    }

    def evaluate_expression(self, expression: str) -> Dict[str, Any]:
        try:
            tree = ast.parse(expression, mode='eval')
            result = self._eval_node(tree.body)
            return {
                "success": True,
                "expression": expression,
                "result": result
            }
        except Exception as e:
            return {
                "success": False,
                "expression": expression,
                "error": f"Calculation error: {str(e)}"
            }

    def _eval_node(self, node):
        if isinstance(node, ast.Constant):
            return node.value
        elif isinstance(node, ast.BinOp):
            left = self._eval_node(node.left)
            right = self._eval_node(node.right)
            return self.ALLOWED_OPERATORS[type(node.op)](left, right)
        elif isinstance(node, ast.UnaryOp):
            operand = self._eval_node(node.operand)
            return self.ALLOWED_OPERATORS[type(node.op)](operand)
        else:
            raise ValueError(f"Unsupported AST node type: {type(node).__name__}")

calc_tool = CalcTool()
