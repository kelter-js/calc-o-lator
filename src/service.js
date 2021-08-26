function* generateNumbers (start, end) {
  for (let i = start; i <= end; i++) yield i;
}

export { generateNumbers }
