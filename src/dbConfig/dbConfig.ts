import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Mongoose connection established successfully');
    });

    connection.on('error', (error) => {
      console.log(
        `Mongoose connection error: ${error}. Make sure you have MongoDB running and Connected`
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong! Try again later');
    console.log(error);
  }
}
