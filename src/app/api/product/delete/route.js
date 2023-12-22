export async function DELETE(request, response) {
  console.log(request.body);
  console.log('DELETE')
  return "ok";
}

export async function POST(request, response) {
  console.log(request.body);
  console.log('POST')
  return "ok";
}
