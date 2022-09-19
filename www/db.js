
let name_db = "background_test_1";
let db = openDatabase(name_db, "1.0", name_db, 2 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS log (id INTEGER PRIMARY KEY AUTOINCREMENT, evento, fecha_hora)");
});

function inserta_log(evento) {
    evento = String(evento)
    db.transaction(function (tx) {
        var fecha_hora = String(new Date().toLocaleString());
        tx.executeSql(
            "INSERT INTO log (evento, fecha_hora) VALUES (?, ?)", [evento, fecha_hora]
        );
    });
}

function listar_log(callback) {
    db.transaction(function (tx1) {
        tx1.executeSql(
            "SELECT * FROM log", [],
            function (tx, results) {
                var len = results.rows.length, i;
                var obj = [];
                for (i = 0; i < len; i++) {
                    var array_json = {};
                    array_json["id"] = results.rows.item(i).id;
                    array_json["evento"] = results.rows.item(i).evento;
                    array_json["fecha_hora"] = results.rows.item(i).fecha_hora;
                    obj.push(array_json);
                }
                callback(obj);
            },
            null
        ); //Fin tx1.executeSql
    }); //Fin db.transaction
}//Fin listar_log

function borrar_log() {
    db.transaction(function (tx) {
        tx.executeSql(`DELETE FROM log`);
        alert("Log eliminado");
        location.reload();
    })
}//Fin de borrar_log



