import random 
from sqlite3 import connect
import random
from country_list import countries_for_language
import countryinfo
import faker

conn = connect('./database.db')
curs = conn.cursor()

countries = []
capitals = []
countries2 = []
dictionary = {'A':'Alpha', 'B':'Bravo','C':'Charlie', 'D':'Delta', 'E':'Echo', 'F':'Foxtrot', 'G':'Golf',"H":"Hotel", 'I':'India', 'J':'Juliet', 'K':'Kilo', 'L':'Lima', 'M':'Mike', 'N':'November', 'O':'Oscar', 'P':'Papa', 'Q':'Quebec', 'R':'Romeo', 'S':'Sierra', 'T':'Tango', 'U':'Uniform', 'V':'Victor', 'W':'Whiskey', 'X':'Xray', 'Y':'Yankee', 'Z':'Zulu'}
words = []

print("Generating words...")
for w in dictionary:
    words.append(dictionary[w])

for i in dict(countries_for_language('en')).keys():
    countries.append(dict(countries_for_language('en'))[i])

for i in countries:
    if " " in i:
        continue
    else:
        try: 
            name = i.upper()
            country = countryinfo.CountryInfo(name)
            capitals.append(country.capital())
            countries2.append(i)
        except KeyError:
            continue

print("Executing queries...")
for i in range(100):
    f = faker.Faker()
    address1 = str(random.randint(0, 100)) + " " + str(words[random.randint(0, 24)]) + " Street"
    try:
        postcode = f.address().split(",")[1]
    except IndexError:
        postcode = "E1 4NS"

    randomC = random.randint(0, 100)
    city = capitals[randomC]
    country = countries2[randomC]
    id = random.randint(1, 50)
    isRoom = random.randint(0,1)
    rent = random.randint(300, 1000)

    curs.execute("INSERT INTO Listings (AddressLine1, County, City, Postcode, LandlordID, Country, IsRoom, RentPerMonth) VALUES('%s','%s','%s','%s','%s','%s','%s', '%s')"%(address1, city, city, postcode, id, country, isRoom, rent))

    conn.commit()

print("Listings generated")
conn.close()