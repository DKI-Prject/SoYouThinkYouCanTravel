app.get("/questions/:category", async (request, response) => {
  const categoryParam = request.params.category;
  try {
    const database = await client.db(db);
    let collectionName;

    // Map category to collection
    switch (categoryParam) {
      case 'beaches':
        collectionName = beaches;
        break;
      case 'mountains':
        collectionName = mountains;
        break;
      case 'nature':
        collectionName = nature;
        break;
      case 'parks':
        collectionName = parks;
        break;
      default:
        return response.status(400).json({ message: 'Invalid category' });
    }

    const coll = await database.collection(collectionName);
    const data = await coll.find().toArray();
    response.status(200).send(data);
  } catch (error) {
    console.error(`Error fetching questions for category ${categoryParam}: ${error}`);
    response.status(500).json({ message: 'Server error' });
  }
});