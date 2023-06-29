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
		{
			id: 15,
			name: "White T-Shirt",
			image: "/productImages/white_tshirt.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "T-Shirt",
			price: 34.99,
			countInStock: 5,
			rating: 3.5,
			numReviews: 20,
		},
		{
			id: 16,
			name: "White Pull",
			image: "/productImages/white_pull.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Pull",
			price: 39.99,
			countInStock: 15,
			rating: 4,
			numReviews: 11,
		},
		{
			id: 17,
			name: "Pink Coat",
			image: "/productImages/pink_coat.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Coat",
			price: 59.99,
			countInStock: 17,
			rating: 4.5,
			numReviews: 30,
		},
		{
			id: 18,
			name: "White Road T-Shirt",
			image: "/productImages/white_leave_the_road_tshirt.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "T-Shirt",
			price: 14.99,
			countInStock: 28,
			rating: 3.5,
			numReviews: 17,
		},
		{
			id: 19,
			name: "Grey Pull",
			image: "/productImages/grey_pull.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Pull",
			price: 24.99,
			countInStock: 32,
			rating: 4,
			numReviews: 11,
		},
		{
			id: 20,
			name: "Grey TShirt",
			image: "/productImages/grey_tshirt.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "T-Shirt",
			price: 17.99,
			countInStock: 17,
			rating: 3.5,
			numReviews: 18,
		},
		{
			id: 21,
			name: "Beige Shirt",
			image: "/productImages/beige_shirt.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Shirt",
			price: 19.99,
			countInStock: 41,
			rating: 4,
			numReviews: 7,
		},
		{
			id: 22,
			name: "Black T-Shirt",
			image: "/productImages/black_tshirt.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "T-Shirt",
			price: 19.99,
			countInStock: 36,
			rating: 4.5,
			numReviews: 14,
		},
		{
			id: 23,
			name: "Blue Jean",
			image: "/productImages/blue_jean.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Pant",
			price: 24.99,
			countInStock: 17,
			rating: 2.5,
			numReviews: 19,
		},
		{
			id: 24,
			name: "Black Sport T-Shirt",
			image: "/productImages/black_sport_tshirt.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "T-Shirt",
			price: 22.99,
			countInStock: 14,
			rating: 2,
			numReviews: 21,
		},
		{
			id: 25,
			name: "White Shirt",
			image: "/productImages/white_shirt.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Shirt",
			price: 18.99,
			countInStock: 47,
			rating: 4.5,
			numReviews: 17,
		},
		{
			id: 26,
			name: "Beige Pull",
			image: "/productImages/beige_pull.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Pull",
			price: 26.99,
			countInStock: 24,
			rating: 4,
			numReviews: 17,
		},
		{
			id: 27,
			name: "Blue Shirt",
			image: "/productImages/blue_shirt.jpeg",
			longDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			shortDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Vivamus arcu felis bibendum ut.",
			category: "Shirt",
			price: 20.99,
			countInStock: 24,
			rating: 4,
			numReviews: 22,
		},
	],
};

export default data;
