from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# --- DATA --- 
swim_races = [
    {
        "id": "1",
        "date": "Sun, July 20th",
        "location_metro": "New York",
        "location_city_or_town": "Brooklyn",
        "location_beach": "Coney Island Beach",
        "location_coords": ["40.57263","-73.9773871"],
        "title": "Grimaldo's Mile",
        "url": "https://cibbows.org/events/grimaldos-mile-2025/",
        "image": "https://cibbows.org/wp-content/uploads/2018/04/19055029_10211555612958109_6119701965930772830_o-962x649.jpg",
        "distance": "1mi",
        "course_map": "https://cibbows.org/wp-content/uploads/2021/05/GMXVII.png",
        "time": "7:30 am",
        "estimated_water_temp": "69F",
        "public_transit": "Take the Q train from Times Sq. to Brighton Beach (55 mins). Walk to Coney Island Beach (10 mins).",
        "entry_fee": "$40",
        "prior_experience_requirement": "None.",
        "summary": "Entry-level swim race with gentle conditions, honoring lifeguard Grimaldo Medrano. Swim parallel to shore at Coney Island Beach, and enjoy the festivities after."
    },
    {   
        "id": "2",
        "date": "Sat, June 21st",
        "location_metro": "New York",
        "location_city_or_town": "Manhattan",
        "location_beach": "West Village Shoreline",
        "location_coords": ["40.721181","-74.013082"],
        "title": "PRIDE Swim Manhattan",
        "url": "https://urbanswim.com/prideswimmanhattan/",
        "image": "https://rsu-photos-v2-v2prod.s3.amazonaws.com/large_watermarked_v3/race_144337_235688_ad7c1686-0485-48cc-a54c-82906c4f7a77.jpg",
        "distance": "1.5mi",
        "course_map": "",
        "time": "TBD",
        "estimated_water_temp": "68F",
        "public_transit": "Take the 2/3 from Times Sq. to 14th St. (5 mins). Walk to the start (15 mins).",
        "entry_fee": "$40",
        "prior_experience_requirement": "None.",
        "summary": "1.5 mile swim in the shadow of the Manhattan skyline from the Chelsea Piers. Celebrates diversity and inclusivity."
    },
    {
        "id": "3",
        "date": "Sun, July 6th",
        "location_metro": "New York",
        "location_city_or_town": "Manhattan",
        "location_beach": "Liberty Island",
        "location_coords": ["40.689249","-74.0445"],
        "title": "Statue of Liberty Swim",
        "url": "https://www.adventuresignup.com/statueoflibertyswim",
        "image": "https://rsu-photos-v2-v2prod.s3.amazonaws.com/large_v3/race_159103_237638_534adb36-ac44-4755-aa44-f62067e10071.jpg",
        "distance": "1mi",
        "course_map": "",
        "time": "10:20 am",
        "estimated_water_temp": "68F",
        "public_transit": "Catch a shuttle boat from the Battery",
        "entry_fee": "$450",
        "prior_experience_requirement": "YES. All participants must provide proof of recent, comparable open water swim experience (the PRIDE Swim Manhattan is an acceptable qualifier), and must swim at a pace of 30 minutes per mile or faster.",
        "summary": "Swim around the Statue of Liberty! There is a pre-race requirement due to the choppy waters."
    },
    {
        "id": "4",
        "date": "Sat, July 26th",
        "location_metro": "New York",
        "location_city_or_town": "Long Island",
        "location_beach": "Kirk Park Beach",
        "location_coords": ["41.031024","-71.949857"],
        "title": "Montauk Ocean Swim Challenge",
        "url": "https://montaukplayhouse.org/oceanswim/",
        "image": "https://elitefeats.com/uploadresults/uploaded/images/23736/23736__md_IMG_8700_JPG_5ab541ad-e562-4709-8c31-a56eb6f2a52d.jpg",
        "distance": "0.5mi, 1mi, 2mi",
        "course_map": "",
        "time": "6:30 am",
        "estimated_water_temp": "68F",
        "public_transit": "Long Island Rail Road",
        "entry_fee": "$TBD",
        "prior_experience_requirement": "None",
        "summary": "Supports the Montauk Playhouse Community Center Foundation Aquatic and Multi-use Cultural Arts Center."
    },
    {
        "id": "5",
        "date": "Sat, July 26th",
        "location_metro": "New York",
        "location_city_or_town": "Westchester",
        "location_beach": "Larchmont Yacht Club",
        "location_coords": ["40.924363","-73.745317"],
        "title": "SAA Long Island Sound",
        "url": "https://www.swimacrossamerica.org/site/TR/OpenWater/LongIslandSound?pg=entry&fr_id=5764",
        "image": "https://live.staticflickr.com/65535/53921742767_1a77a32ede_h.jpg",
        "distance": "2km, 5km, and 10km",
        "course_map": "",
        "time": "6:00am",
        "estimated_water_temp": "70F",
        "public_transit": "Take the New Haven line north from Times Sq. (40 mins).",
        "entry_fee": "$TBD donation",
        "prior_experience_requirement": "None",
        "summary": "Community-oriented open water swim with many distance options in the Long Island Sound"
    },
    {
        "id": "6",
        "date": "Sat, July 26th",
        "location_metro": "New York",
        "location_city_or_town": "Westchester",
        "location_beach": "Hudson River",
        "location_coords": ["41.504030","-74.004946"],
        "title": "Great Newburgh to Beacon Swim",
        "url": "https://www.riverpool.org/about-river-swim/",
        "image": "https://www.riverpool.org/wp-content/uploads/2023/04/River-Swim-2022.5-photo-by-Alan-Thomas.jpg",
        "distance": "1mi",
        "course_map": "",
        "time": "",
        "estimated_water_temp": "75F",
        "public_transit": "",
        "entry_fee": "$100 sponsorship and TBD registration fee",
        "prior_experience_requirement": "None.",
        "summary": "Scenic swim in the Hudson River, focused around charitable sponsorship."
    },
    {
        "id": "7",
        "date": "Sat, August 2nd",
        "location_metro": "New York",
        "location_city_or_town": "Long Island",
        "location_beach": "Oyster Bay",
        "location_coords": ["40.898042","-73.621462"],
        "title": "SAA Nassau-Suffolk County",
        "url": "https://www.swimacrossamerica.org/site/TR/OpenWater/NassauSuffolk?pg=entry&fr_id=7903",
        "image": "https://live.staticflickr.com/65535/52273302902_58063c5384_c.jpg",
        "distance": "0.5mi, 1mi, 5km, 10km",
        "course_map": "",
        "time": "7:00 am",
        "estimated_water_temp": "72F",
        "public_transit": "Long Island Railroad",
        "entry_fee": "$TBD",
        "prior_experience_requirement": "None",
        "summary": "Swim Accross America (SAA) race in Oyster Bay in the Long Island Sound. Many race distances offered."
    },
    {
        "id": "8",
        "date": "Sun, August 10th",
        "location_metro": "New York",
        "location_city_or_town": "Long Island",
        "location_beach": "Sag Harbor",
        "location_coords": ["40.997731","-72.324040"],
        "title": "STAR AquaCenter Summer Splash",
        "url": "https://events.elitefeats.com/24aquacenter#info",
        "image": "https://cdn.uploads.webconnex.com/73/star%20aqua%20center%20header.png?1712254622371",
        "distance": "0.25mi, 0.5mi, 1mi",
        "course_map": "https://s3.amazonaws.com/uploads.webconnex.com/73%2F1722624972931-STAR+Race+Map+-+08.10.png",
        "time": "8:00 am",
        "estimated_water_temp": "72F",
        "public_transit": "Long Island Railroad",
        "entry_fee": "$0",
        "prior_experience_requirement": "None.",
        "summary": "Community-driven swim race with many race distance options and no entry fee."
    },
    {
        "id": "9",
        "date": "Sun, August 10th",
        "location_metro": "New York",
        "location_city_or_town": "Long Island",
        "location_beach": "Long Beach",
        "location_coords": ["40.58388","-73.661055"],
        "title": "Lifeguard Memorial",
        "url": "https://www.longbeachny.gov/index.asp?SEC=DF7AE75E-CC83-4397-BA9C-F6AFBAB8B5E2&DE=FB106A13-CA7C-4C26-8559-B24115EDA914",
        "image": "https://www.longbeachny.gov/vertical/Sites/%7BC3C1054A-3D3A-41B3-8896-814D00B86D2A%7D/uploads/Copy_of_Copy_of_Copy_of_one_mile_swim_(Facebook_Post_(Landscape))_Web.jpg",
        "distance": "1mi",
        "course_map": "",
        "time": "9:15 am",
        "estimated_water_temp": "71F",
        "public_transit": "Long Island Railroad",
        "entry_fee": "$TBD",
        "prior_experience_requirement": "None",
        "summary": "Support the lifeguards of Long Beach!"
    },
    {
        "id": "10",
        "date": "Sat, August 16th",
        "location_metro": "New York",
        "location_city_or_town": "Long Island",
        "location_beach": "Southhampton",
        "location_coords": ["40.864909","-72.406404"],
        "title": "Smile Swim",
        "url": "https://events.elitefeats.com/24smile",
        "image": "https://s3.amazonaws.com/uploads.webconnex.com/73%2F1689550828688-SVOR+crew+moonlit+plunge_.jpg",
        "distance": "0.25mi, 0.5mi, 1mi",
        "course_map": "",
        "time": "6:30 am",
        "estimated_water_temp": "70F",
        "public_transit": "Long Island Railroad",
        "entry_fee": "$TBD",
        "prior_experience_requirement": "None.",
        "summary": "Fun race with short race options available."
    },
    {
        "id": "11",
        "date": "Sat, August 30th",
        "location_metro": "New York",
        "location_city_or_town": "Long Island",
        "location_beach": "Amagansett",
        "location_coords": ["40.969826","-72.123867"],
        "title": "Red Devil",
        "url": "https://runsignup.com/Race/NY/Amagansett/RedDevilSwim",
        "image": "https://d368g9lw5ileu7.cloudfront.net/races/race148066-logo-0.bKBNoR.png",
        "distance": "0.25mi, 0.5mi, 1mi",
        "course_map": "",
        "time": "TBD",
        "estimated_water_temp": "70F",
        "public_transit": "",
        "entry_fee": "$TBD",
        "prior_experience_requirement": "None.",
        "summary": "What the heck is a Red Devil? The red “Speedo-type” bathing suit often associated with male lifeguards and the culture of lifeguarding has long been nicknamed the “Red Devil.” "
    },
    {
        "id": "12",
        "date": "Sun, August 10th",
        "location_metro": "Boston",
        "location_city_or_town": "Salem",
        "location_beach": "Collins Cove",
        "location_coords": ["42.527728","-70.887649"],
        "title": "Wild Fish",
        "url": "https://runsignup.com/Race/MA/Salem/WildFishSwimFestival",
        "image": "https://d368g9lw5ileu7.cloudfront.net/races/race109423-logo-0.bLQdof.png",
        "distance": "0.5mi, 1mi, 2mi",
        "course_map": "",
        "time": "12:00pm",
        "estimated_water_temp": "66F",
        "public_transit": "Commuter rail from North Station (45 mins).",
        "entry_fee": "$30",
        "prior_experience_requirement": "None.",
        "summary": "Annual community open water swim event in Salem."
    }
];

# --- ROUTES ---
@app.route('/')
def home():
   return render_template('home.html', data={"swim_races":swim_races})   

@app.route('/search_results')
def search_results():
    query = request.args.get('q', '').lower()
    search_fields = ["title", "location_metro", "location_city_or_town", "location_beach", "distance", "date"] 
    filtered_swim_races = [
        item for item in swim_races 
        if any(query in item[field].lower() for field in search_fields)
    ]
    return render_template("search_results.html", data={"swim_races": filtered_swim_races})

@app.route('/api/search_results')
def search_swim_races():
    query = request.args.get('q', '').lower()
    search_fields = ["title", "location_metro", "location_city_or_town", "location_beach", "distance", "date"]
    filtered_swim_races = [
        item for item in swim_races 
        if any(query in item[field].lower() for field in search_fields)
    ]
    return jsonify({"swim_races": filtered_swim_races})

@app.route('/view/<int:id>')
def view_swim_race(id):
    found_race = next((race for race in swim_races if race['id'] == str(id)), None)
    return render_template('view_item.html', data={"swim_race": found_race})

@app.route('/add', methods=['GET','POST'])
def add_swim_race():
    if request.method == 'POST':
        data = request.get_json()
        new_id = str(len(swim_races) + 1)  
        data["id"] = new_id
        swim_races.append(data)
        return jsonify({"id": new_id}), 201 
    return render_template('add_item.html', data={"swim_races":swim_races})

@app.route('/edit/<int:id>', methods=['GET','POST'])
def edit_swim_race(id):
    if request.method == 'POST':
        updated_data = request.get_json()
        race_index = next((i for i, race in enumerate(swim_races) 
                         if race['id'] == str(id)), None)
        if race_index is None:
            return jsonify({"error": "Race not found"}), 404
        for key, value in updated_data.items():
            swim_races[race_index][key] = value
        return jsonify({"success": True, "id": str(id)}), 201
    race = next((race for race in swim_races if race['id'] == str(id)), None)
    return render_template('edit_item.html', data={"swim_race": race, "swim_races":swim_races})

if __name__ == '__main__':
   app.run(debug = True, port=5001)