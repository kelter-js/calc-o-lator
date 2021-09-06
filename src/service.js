function* generateNumbers (start, end) {
  for (let i = start; i <= end; i++) yield String(i);
}

export { generateNumbers }
