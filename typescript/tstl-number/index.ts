/**
 * @version 0.0.1
 */

import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

export default function transformHexNumbers(program: ts.Program, options: tstl.CompilerOptions): tstl.Plugin {
  return {
    visitors: {
      [ts.SyntaxKind.NumericLiteral]: (node: ts.NumericLiteral, context: tstl.TransformationContext) => {
        const num = Number(node.text);
        const decString = num.toString(10);

        if (node.text.includes(".") || node.text.toLowerCase().includes("e") || decString.length <= 7) {
          return tstl.createNumericLiteral(num, node);
        }

        const hexString = "0x" + num.toString(16).toUpperCase();
        return tstl.createIdentifier(hexString, node);
      },
    },
  };
}
