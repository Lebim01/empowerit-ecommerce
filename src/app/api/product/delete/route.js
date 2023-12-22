export async function DELETE(request, response) {
  console.log(request.body);
  console.log('DELETE')
  response.send("OK");
}

export async function POST(request, response) {
  console.log(request.body);
  console.log('POST')
  response.send("OK");
}
