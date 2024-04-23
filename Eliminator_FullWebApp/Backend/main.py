from flask_cors import CORS
from datetime import date
import sqlite3
import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)
CORS(app)

app.config['PROPAGATE_EXCEPTIONS'] = False
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)



@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/register', methods=["POST"])
def register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    authority = 2

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"SELECT id FROM user WHERE email='{email}'")
            data = cur.fetchone()
            if data != None:
                return {"msg": "The email is allredy taken","return": 1}
        except:
            print("Server> 'user' database problem")
    con.close()
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute("INSERT INTO user (email, password, authority) VALUES  (?,?,?)", (email,password,authority))
            con.commit()
            print("Server> Sikeres hozzá adás")
        except:
            print("Server> 'user' database insert into error")
            con.rollback()
    con.close()
    return {"msg": "Register sucessfully","return": 0}

@app.route('/token', methods=["POST"])
def create_token():
    id = -1
    authority = 2
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"SELECT * FROM user WHERE email LIKE '{email}'")
            data = cur.fetchone()
            if data is None:
                return {"msg": "Wrong email"}, 401
            else:
                id = data[0]
                print(id)
                authority = data[3]
            cur.execute(f"SELECT id FROM user WHERE password='{password}'")
            data = cur.fetchone()
            if data is None:
                return {"msg": "Wrong password"}, 401
        except:
            print("Server> 'user' database problem")
    access_token = create_access_token(identity=email)
    response = {"access_token": access_token, "id": id, "authority": authority}
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/profile', methods=["POST"])
@jwt_required()
def my_profile():
    id = request.json.get("id", None)
    authority = 2
    userName = ""
    orders = ""
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"SELECT * FROM user WHERE id='{id}'")
            data = cur.fetchone()
            if data is None:
                 return {"msg": "User dosn't find!"}
            else:
                userName =data[1]
                authority = data[3]
        except:
            print("Server> User profile problem")
    con.close()
    if(authority != 1):
        try:
            con = sqlite3.connect("datas.db")
            con.row_factory = sqlite3.Row
            cur = con.cursor()
            cur.execute(f"SELECT * FROM orders WHERE userId='{id}'")
            rows = cur.fetchall()
            orders = json.dumps([dict(ix) for ix in rows])
        except:
            print("Server> User order problem")
    elif(authority == 1):
        try:
            con = sqlite3.connect("datas.db")
            con.row_factory = sqlite3.Row
            cur = con.cursor()
            cur.execute(f"SELECT * FROM orders WHERE agentId={id}")
            rows = cur.fetchall()
            orders = json.dumps([dict(ix) for ix in rows])
        except:
            print("Server> User order Agent problem")

    response_body = {
        "authority": authority,
        "userName": userName,
        "orders": orders
    }

    return response_body

@app.route('/registerAgent', methods=["POST"])
@jwt_required()
def register_agent():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    authority = 1

    id = -1
    name = request.json.get("name", None)
    description_short = request.json.get("descriptionShort", None)
    description = request.json.get("description", None)
    rating = "0"
    price = request.json.get("price", None)
    picture = request.json.get("picture", None)
    status = 1

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"SELECT id FROM user WHERE email='{email}'")
            data = cur.fetchone()
            if data != None:
                return {"msg": "The email is allredy taken","return": 1}
        except:
            print("Server> 'user_agnet' database problem")

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute("INSERT INTO user (email, password, authority) VALUES  (?,?,?)",(email,password,authority))
            con.commit()
            print("Server> Sikeres hozzá adás")
        except:
            print("Server> 'user_agent' database insert into error")
            con.rollback()
    con.close()

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"SELECT id FROM user WHERE email='{email}'")
            data = cur.fetchone()
            if data != None:
                id = data[0]
            print(id)
        except:
            print("Server> SELECT 'user_agent' id problem")
    con.close()

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute("INSERT INTO agent (id, name, descriptionShort, description, rating, price, picture, status) "
                        "VALUES  (?,?,?,?,?,?,?,?)", (id, name, description_short, description, rating, price, picture, status))
            con.commit()
            print("Server> Sikeres hozzá adás")
        except:
            print("Server> 'agent' database insert into error")
            con.rollback()
    con.close()

    return {"msg": "Register sucessfully","return": 0}

@app.route('/agentShop')
@jwt_required()
def agentShop():
    con = sqlite3.connect("datas.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("select * from agent")
    rows = cur.fetchall()
    return json.dumps([dict(ix) for ix in rows])

@app.route('/agnetView', methods=["POST"])
@jwt_required()
def agent_view():
    id = request.json.get("id", None)
    name = ""
    description = ""
    rating = ""
    price = -1
    picture = -1

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"SELECT * FROM agent WHERE id='{id}'")
            data = cur.fetchone()
            if data is None:
                 return {"msg": "Agent dosn't find!"}
            else:
                name = data[1]
                description = data[3]
                rating = data[4]
                price = data[5]
                picture = data[6]
        except:
            print("Server> Agent view proplem")

    response_body = {
        "id": id,
        "name": name,
        "description": description,
        "rating": rating,
        "price": price,
        "picture": picture
    }
    return response_body

@app.route('/order', methods=["POST"])
def order():
    userId = request.json.get("userId", None)
    orderDay = date.today()
    agentId = request.json.get("agentId", None)
    agentName = ""
    status = 1
    pay = 0
    targetName = request.json.get("targetName", None)
    targetLocation = request.json.get("targetLocation", None)
    targetDescription = request.json.get("targetDescription", None)
    reason = request.json.get("reason", None)

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"SELECT * FROM agent WHERE id='{agentId}'")
            data = cur.fetchone()
            if data != None:
                pay = data[5]
                agentName = data[1]
        except:
            print("Server> 'agent order' get pay problem")
    con.close()

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute("INSERT INTO orders (userId, date, agentId, agentName, status, pay, targetName, targetLocation, targetDescription, reason) VALUES "
                       "(?,?,?,?,?,?,?,?,?,?)", (int(userId), orderDay, int(agentId), agentName, int(status), int(pay), targetName, targetLocation, targetDescription, reason))
            con.commit()
            print("Server> Sikeres hozzá adás")
        except:
            print("Server> 'order' database insert into error")
            con.rollback()
    con.close()

    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"UPDATE agent SET status=0 WHERE id={agentId}")
            con.commit()
        except:
            print("Server> 'order' database agent update error")
            con.rollback()
    con.close()
    return {"msg": "Order sucessfully","return": 0}

@app.route('/workDone', methods=["POST"])
def workDone():
    id = request.json.get("id", None)
    orderId = request.json.get("orderId", None)
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"UPDATE orders SET status=2 WHERE id LIKE {int(orderId)}")
            con.commit()
        except:
            print("Server> 'order' database status update error")
            con.rollback()
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"UPDATE agent SET status=1 WHERE id={int(id)}")
            con.commit()
        except:
            print("Server> 'agent' database status update error")
            con.rollback()

    return {"msg": "Work done sucessfully","return": 0}

@app.route('/rating', methods=["POST"])
def rating():
    rate = request.json.get("rate", None)
    agentId = request.json.get("agentId", None)
    orderId = request.json.get("orderId", None)
    currentRateing = ""
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"SELECT rating FROM agent WHERE id='{agentId}'")
            data = cur.fetchone()
            if data != None:
                currentRateing = data[0]
        except:
            print("Server> 'agent' rating database select error")
            con.rollback()
    con.close()
    currentRateing += ','
    currentRateing += str(rate)
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"UPDATE agent SET rating='{currentRateing}' WHERE id LIKE {int(agentId)}")
            con.commit()
        except:
            print("Server> 'agent' rating database status update error")
            con.rollback()
    con.close()
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"UPDATE orders SET status=0 WHERE id LIKE {int(orderId)}")
            con.commit()
        except:
            print("Server> 'order' status  status update error")
            con.rollback()
    con.close()
    return {"msg": "Work done sucessfully","return": 0}

@app.route('/users', methods=["POST"])
def users():
    users = ""
    try:
        con = sqlite3.connect("datas.db")
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute("select * from user")
        rows = cur.fetchall()
        users = json.dumps([dict(ix) for ix in rows])
    except:
        print("Server> 'users' database list all error")

    return users

@app.route('/deleteuser', methods=["POST"])
def deleteuser():
    id = request.json.get("id", None)
    print(id)
    ret = "Delete susecful"
    with sqlite3.connect("datas.db") as con:
        try:
            cur = con.cursor()
            cur.execute(f"delete from user where id = {id}")
        except:
            print("Server> 'deleteuser' database delet error")

    return ret

if __name__ == "__main__":
    app.run(debug=True)