import bcrypt from "bcryptjs";

const data = {
	users: [
		{
			name: "Alex",
			email: "admin@example.com",
			password: bcrypt.hashSync("12345678"),
			isAdmin: true,
		},
		{ name: "John Doe", email: "john@example.com", password: bcrypt.hashSync("12345678") },
		{ name: "Jane Doe", email: "jane@example.com", password: bcrypt.hashSync("12345678") },
	],
	products: [
		{
			id: 1,
			name: "Red Dress",
			image: "/productImages/red_dress.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Dress",
			price: 89.99,
			countInStock: 10,
			rating: 4.5,
			numReviews: 12,
		},
		{
			id: 2,
			name: "Yellow Dress",
			image: "/productImages/yellow_dress.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Dress",
			price: 59.99,
			countInStock: 7,
			rating: 4.0,
			numReviews: 8,
		},
		{
			id: 3,
			name: "Blue Dress",
			image: "/productImages/blue_dress.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Dress",
			price: 69.99,
			countInStock: 5,
			rating: 3,
			numReviews: 12,
		},
		{
			id: 4,
			name: "Brown T-Shirt",
			image: "/productImages/brown_tshirt.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "T-Shirt",
			price: 39.99,
			countInStock: 10,
			rating: 4.5,
			numReviews: 12,
		},
		{
			id: 5,
			name: "Blue T-Shirt",
			image: "/productImages/blue_tshirt.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "T-Shirt",
			price: 35.99,
			countInStock: 10,
			rating: 4.5,
			numReviews: 12,
		},
		{
			id: 6,
			name: "Colored T-Shirt",
			image: "/productImages/bluepink_tshirt.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "T-Shirt",
			price: 31.99,
			countInStock: 5,
			rating: 3,
			numReviews: 12,
		},
		{
			id: 7,
			name: "Brown Pant",
			image: "/productImages/brown_pant.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Pant",
			price: 41.99,
			countInStock: 5,
			rating: 3,
			numReviews: 12,
		},
		{
			id: 8,
			name: "Green Pant",
			image: "/productImages/green_pant.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Pant",
			price: 39.99,
			countInStock: 5,
			rating: 3,
			numReviews: 12,
		},
		{
			id: 9,
			name: "White Pant",
			image: "/productImages/white_pant.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Pant",
			price: 35.99,
			countInStock: 5,
			rating: 3,
			numReviews: 12,
		},
		{
			id: 10,
			name: "Belt",
			image: "/productImages/belt.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Accessories",
			price: 15.99,
			countInStock: 5,
			rating: 3,
			numReviews: 12,
		},
		{
			id: 11,
			name: "Hat",
			image: "/productImages/hat.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Accessories",
			price: 18.99,
			countInStock: 5,
			rating: 3,
			numReviews: 12,
		},
		{
			id: 12,
			name: "Jewels",
			image: "/productImages/jewels.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Accessories",
			price: 23.99,
			countInStock: 15,
			rating: 4,
			numReviews: 12,
		},
		{
			id: 13,
			name: "Neckless",
			image: "/productImages/neckless.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Accessories",
			price: 33.99,
			countInStock: 15,
			rating: 3.5,
			numReviews: 5,
		},
		{
			id: 14,
			name: "Wristband",
			image: "/productImages/wristband.jpg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Accessories",
			price: 11.99,
			countInStock: 9,
			rating: 4.5,
			numReviews: 17,
		},
	],
};

export default data;
