import random 
from sqlite3 import connect
import names
import bcrypt
import random

default_password = b'ecs506u'


conn = connect('./database.db')
curs = conn.cursor()

first_names = [names.get_first_name() for x in range(0, 100)]
surnames = [names.get_last_name() for x in range(0, 100)]

for i in range(len(first_names)):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(default_password, salt)
    print("Inserting " + first_names[i] + " " + surnames[i] + " into Users table...")
    email = first_names[i][0] + "." + surnames[i] + "@FDM.com"


    if (i < 50):
        UserType = "landlord"
        AgencyName = first_names[i] + " Landlord"
        print("INSERT INTO \"Users\" (FirstName, LastName, Email, Password, UserType, AgencyName) VALUES('% s', '% s', '% s', '% s', '% s', '% s')"% (first_names[i], surnames[i], email, hashed.decode('utf-8'), UserType, AgencyName))
        curs.execute("INSERT INTO \"Users\" (FirstName, LastName, Email, Password, UserType, AgencyName) VALUES('% s', '% s', '% s', '% s', '% s', '% s')"% (first_names[i], surnames[i], email, hashed.decode('utf-8'), UserType, AgencyName))
    else:
        UserType = "member"
        EmployeeNum = random.randint(100000, 200000)
        print("INSERT INTO \"Users\" (FirstName, LastName, Email, Password, UserType, EmployeeNo) VALUES('% s', '% s', '% s', '% s', '% s', '% s')"%(first_names[i], surnames[i], email, hashed.decode('utf-8'), UserType, EmployeeNum))
        curs.execute("INSERT INTO \"Users\" (FirstName, LastName, Email, Password, UserType, EmployeeNo) VALUES('% s', '% s', '% s', '% s', '% s', '% s')"%(first_names[i], surnames[i], email, hashed.decode('utf-8'), UserType, EmployeeNum))

    conn.commit()


conn.close()

print("All operations successfully completed")