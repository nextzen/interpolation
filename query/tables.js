
module.exports.street = function( db, rebuild, done ){
  db.serialize(function(){

    // create rtree table
    if( rebuild ){ db.run("DROP TABLE IF EXISTS rtree;"); }
    db.run("CREATE VIRTUAL TABLE IF NOT EXISTS rtree USING rtree(id, minX, maxX, minY, maxY);");

    // create names table
    if( rebuild ){ db.run("DROP TABLE IF EXISTS names;"); }
    db.run("CREATE TABLE IF NOT EXISTS names (rowid INTEGER PRIMARY KEY, id INTEGER, name TEXT);");

    // create fts table
    // if( rebuild ){ db.run("DROP TABLE IF EXISTS names;"); }
    // db.run("CREATE VIRTUAL TABLE IF NOT EXISTS names USING fts4(rowid INTEGER PRIMARY KEY, id INTEGER, name TEXT, notindexed=id, tokenize=simple);");

    // create polyline table
    if( rebuild ){ db.run("DROP TABLE IF EXISTS polyline;"); }
    db.run("CREATE TABLE IF NOT EXISTS polyline (id INTEGER PRIMARY KEY, line TEXT);");

    // create geometry table
    // if( rebuild ){ db.run("DROP TABLE IF EXISTS geometry;"); }
    // db.run("CREATE TABLE IF NOT EXISTS geometry (id INTEGER PRIMARY KEY);");
    // if( rebuild ){ db.run("SELECT AddGeometryColumn('geometry', 'geometry', 4326, 'LINESTRING', 'xy', 1);"); }

    db.wait(done);
  });
};

module.exports.address = function( db, rebuild, done ){
  db.serialize(function(){

    // create address table
    if( rebuild ){ db.run("DROP TABLE IF EXISTS address;"); }
    db.run("CREATE TABLE IF NOT EXISTS address (rowid INTEGER PRIMARY KEY, id INTEGER, source TEXT, housenumber REAL, lat REAL, lon REAL, proj_lat REAL, proj_lon REAL);");

    db.wait(done);
  });
};