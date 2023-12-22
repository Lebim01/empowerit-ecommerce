export async function POST(request, response) {
  console.log(request.body);
  console.log('POST')
  response.send("OK");
}

export async function PUT(request, response) {
  console.log(request.body);
  console.log('PUT')
  response.send("OK");
}
