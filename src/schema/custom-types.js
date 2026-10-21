const { customType } = require("drizzle-orm/mysql-core")

// Maps MySQL BLOB to a Node.js Buffer
const blob = customType({
	dataType() {
		return "blob"
	},
})

module.exports = { blob }
