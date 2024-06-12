import mongoose from 'mongoose';

if (!process.env.MONGO_URI) {
	throw new Error('Environment variables not set.');
}

export const dbConnect = async () => {
	if (mongoose.connection.readyState === 1) {
		const db = mongoose.connection.asPromise();
		return db;
	}
	try {
		const db = await mongoose.connect(process.env.MONGO_URI!, {
			dbName: 'flourished-v2',
		});
		return db;
	} catch (err) {
		console.log(err);
		throw new Error('Could not connect to database.');
	}
};
