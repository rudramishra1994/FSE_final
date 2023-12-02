export const deepCopy = (array) => {
  if (array === null || array === undefined) {
    return array;
  }
  
  if (Array.isArray(array)) {
    return array.map(obj => obj.clone());
  } else {
    return array.clone();
  }
}

export const parseTextWithHyperlinks = (text) => {
  const hyperlinkRegex = /\[([^\]]+)\]\((https:\/\/[^)]+)\)/g;

  let parts = [];
  let lastIndex = 0;
  
  text.replace(hyperlinkRegex, (match, linkText, url, offset) => {
    parts.push(text.substring(lastIndex, offset));
    parts.push(<a key={offset} href={url} target="_blank" rel="noopener noreferrer">{linkText}</a>);
    lastIndex = offset + match.length;
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};


export const containsValidHyperLink =(text)=>{
  const hyperlinkRegex = /\[([^\]]+)\]\((https:\/\/[^)]+)\)/g;

  // if (!text.match(hyperlinkRegex) && text.includes('[') && text.includes(']') && text.includes('(') && text.includes(')')) {
  // if (!text.match(hyperlinkRegex)) {
  //   return false;
  // }
  // return true;

  return hyperlinkRegex.test(text);
}

export const containsHyperLinkPattern = (text) => {
  const hyperLinkPattern = /\[([^\]]*)\]\(([^)]*)\)/;

  return hyperLinkPattern.test(text);
};
