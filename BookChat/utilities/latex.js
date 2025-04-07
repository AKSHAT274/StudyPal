/**
 * Converts LaTeX formatted text to plain text
 * @param {string} latexString - The LaTeX formatted string
 * @return {string} The converted plain text
 */
export default function convertLatexToPlainText(latexString) {
  let plainText = latexString;
  
  // Remove math environment delimiters
  plainText = plainText.replace(/\\[\(\[]/g, '');
  plainText = plainText.replace(/\\[\)\]]/g, '');
  
  
  // Handle subscripts
  plainText = plainText.replace(/\_\{([^}]+)\}/g, '_$1');
  plainText = plainText.replace(/\_([a-zA-Z0-9])/g, '_$1');
  
  // Handle superscripts
  plainText = plainText.replace(/\^\{([^}]+)\}/g, '^$1');
  plainText = plainText.replace(/\^([a-zA-Z0-9])/g, '^$1');
  
  // Handle fractions
  plainText = plainText.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)');
  
  // Greek letters
  plainText = plainText.replace(/\\alpha/g, 'alpha');
  plainText = plainText.replace(/\\beta/g, 'beta');
  plainText = plainText.replace(/\\gamma/g, 'gamma');
  plainText = plainText.replace(/\\delta/g, 'delta');
  plainText = plainText.replace(/\\epsilon/g, 'epsilon');
  plainText = plainText.replace(/\\theta/g, 'theta');
  plainText = plainText.replace(/\\lambda/g, 'lambda');
  plainText = plainText.replace(/\\mu/g, 'mu');
  plainText = plainText.replace(/\\pi/g, 'pi');
  plainText = plainText.replace(/\\sigma/g, 'sigma');
  plainText = plainText.replace(/\\tau/g, 'tau');
  plainText = plainText.replace(/\\omega/g, 'omega');
  // Add more Greek letters as needed
  
  plainText = plainText.replace(/\*\*/g, '');
  // Common mathematical symbols
  plainText = plainText.replace(/\\times/g, 'x');
  plainText = plainText.replace(/\\div/g, '/');
  plainText = plainText.replace(/\\pm/g, '±');
  plainText = plainText.replace(/\\leq/g, '<=');
  plainText = plainText.replace(/\\geq/g, '>=');
  plainText = plainText.replace(/\\neq/g, '!=');
  plainText = plainText.replace(/\\approx/g, '≈');
  
  // Text formatting
  plainText = plainText.replace(/\\textbf\{([^}]+)\}/g, '$1');
  plainText = plainText.replace(/\\textit\{([^}]+)\}/g, '$1');
  plainText = plainText.replace(/\\emph\{([^}]+)\}/g, '$1');
  
  // Square roots
  plainText = plainText.replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)');
  plainText = plainText.replace(/\\sqrt\[([^]]+)\]\{([^}]+)\}/g, 'root($1)($2)');
  
  // Remove quotation marks
  plainText = plainText.replace(/``/g, '"');
  plainText = plainText.replace(/''/g, '"');
  
  // Handle special LaTeX spaces
  plainText = plainText.replace(/~/g, ' ');
  plainText = plainText.replace(/\\,/g, ' ');
  plainText = plainText.replace(/\\:/g, ' ');
  plainText = plainText.replace(/\\;/g, ' ');
  plainText = plainText.replace(/\\quad/g, '    ');
  plainText = plainText.replace(/\\qquad/g, '        ');
  
  // Handle special LaTeX characters
  plainText = plainText.replace(/\\\$/g, '$');
  plainText = plainText.replace(/\\\&/g, '&');
  plainText = plainText.replace(/\\\%/g, '%');
  plainText = plainText.replace(/\\\#/g, '#');
  plainText = plainText.replace(/\\_/g, '_');
  plainText = plainText.replace(/\\{/g, '{');
  plainText = plainText.replace(/\\}/g, '}');
  
  // Remove any remaining backslashes
  plainText = plainText.replace(/\\/g, '');
  
  return plainText;
}

