export async function POST(request, response) {
  console.log(request.body);
  console.log('POST')
  return "ok";
}

export async function PUT(request, response) {
  console.log(request.body);
  console.log('PUT')
  return "ok";
}
