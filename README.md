# Introduction
The dynamodb simple query module is designed as a 
wrapper around dynamodb to hide away some of the complexities
of CRUD in dynamo. 
Some of the advantages:
* Don't need to worry about filter expressions vs the data values
* Batch writes/reads are automatically chunked to avoid AWS limitations
* Partially failed batches are retried
* Can register data "type"s to store data in a table like format using a single table (or a few tables as required)
* Remove the need to worry about which dynamodb table is being queried every time a query is made.

In addition the filter query syntax is written in a format similar to mongodb
with '$eq', '$lt', '$gt' style syntax, for familiarity if swapping across from mongo.

# Getting Started
This module is designed for use within AWS serverless environment. It can be used outside however does not provide any way to configue the 
aws object (todo in future), so regions etc would need to be registered via environment variables.

### Install 
```
npm i dynamodb-simple-query
```

### Use
```
import { getDocuments } from 'dynamodb-simple-query'
// get all of the posts for user "bob"
const {items: posts, more} = await getDocuments('user', 'USER|bob', 'POST|', {sortBeginsWith: true})
console.log(posts)  // all posts found in first page of results from dynamodb

if (more) { 
  console.log('There is at least one more page of posts')
  const {items: morePosts } = await getDocuments('user', 'USER|bob', 'POST|', {sortBeginsWith: true, more})
  console.log(morePosts) // all posts found in second page of results... etc.
}
```

You can also query with a filter.
```
const oneWeekAgo = moment().subtract(7, 'days').valueOf() 
const {items: marysRecentPosts} = await getDocuments('user','USER|mary','POST|', {where: {postDate: {$gt: oneWeekAgo}}, sortBeginsWith: true})
```

If mary writes a new post she can add it
```
await createDocument('user','USER|mary','POST|newPostId', postData)
```

### Namespacing and the "type" argument
Namespacing (unique partition and sort keys) is NOT part of this library, you are responsible for doing this.
 
In the above examples the data structure is using a single table format where data types are prefixed in the id
to create unique partition and sort keys. The "type" in the first argument is simply used for the library to calculate which dynamodb table 
to use and which keys to use if there are any overrides for that type, it is not used to manipulate the values of any data and therefore
does not guarantee any sort of uniqueness within the database.  

# Data double write protection
Every document saved to dynamodb by this library uses a version key. This is similar to mongoose's __v key which guarantees (as best we can)
that the document has not been modified. That is if updating a document, the __v version must match what is in the database. If it does
then the write can proceed and no other entity has made a change in the mean time. 

This helps to solve the following situation:
1. Mary and Jane both have access to update a post. Say it is currently version 3.
2. Mary gets the post from the DB and starts editing in her client.
3. Jane gets the same post from the DB and starts editing in her own client.
4. Mary saves the updated document to the DB, the document is not version 4 in the db.
5. Jane attempts to save the document in the DB, however her pre-update version is 3 which does not match the DB
current version, so the library will throw an `ORM_VERSION_MISMATCH` error and fail to save the changes. If this did not happen then Mary's changes would have been lost.

What versioning is not. It does NOT store a copy of old versions, old documents are lost when updating. It is out of the scope of this library.

Note: If writing to this database by another library then we cannot know that the data has changed and this key will not guarantee nothing 
else has written to this document

# "Scan" requests
This library only supports the `query` operation and not the `scan` operation. This is because scans are quite expensive and should be 
avoided as much as possible, so our solution is to make it annoying to work with `scan` 😀 

If you need to use scan then use the dynamodb client directly from `aws-sdk` 

# Configuration
All parameters can be configured via environment variables or programmatically.

| Variable     | Environment Variable | Default    | Description |
|--------------|----------------------|------------|-------------|
| table        | APPLICATION_TABLE    | null       | The default table to use for all operations, this is a required config. |
| partitionKey | PARTITION_KEY        | pk         | The default partition key in the data. |
| sortKey      | SORT_KEY             | sk         | The default sort key. |
| ttlKey       | TTL_KEY              | expiryTime | The key for the ttl parameter if enabled in dynamodb. |
| versionKey   | VERSION_KEY          | __v        | The key used to store the current document version. |
| reverseIndex | REVERSE_INDEX_KEY    | reverse    | The name of the reverse index if there is one. |

If configuring programmatically you can use the `setTableConfig` function.
If you have a particular data type that uses another table in dynamodb, then that can be configured as an override for that data type.
Overrides can also be specified for any other fields as well, though if using the same table you will need the same partition/sort key for 
every data type in that table.

Example of programmatic configuration:
```
import { setTableConfig } from 'dynamodb-simple-query'
setTableConfig({
  table: 'myTable',
  ttlKey: 'ttl',
  types: {
    user: { table: 'myUserTable', partitionKey: 'id', sortKey: 'sort' }
  }
})
```

In the above example all data types will use the `myTable` table in dynamodb, except for the 'user' type, this will use the `myUserTable` table.

### Configuration of DyanmoDB
This is not part of this library. You must create the tables in dynamodb before using the library.