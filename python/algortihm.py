import pandas as pd
import networkx as nx

url = "https://www.transtats.bts.gov/AverageFare/?Year=2021"

#reads url and gets all the tables from page
df = pd.read_html(url)

#gets the desired table we need
desired_table = df[2]

#Create table that has both airport codes and average fare
apCodes_avgFare = desired_table.iloc[:, [1, 4]]
apc_agfDict = apCodes_avgFare.to_dict(orient='records')

#Create table that has airport codes, and create a list from it
APcodes = desired_table.iloc[:, [1]]
apcList = APcodes.squeeze().tolist()

#search that calculates the best flight path
def algo_function(start, end):
    #Checks if start or end are valid airport codes
    if start not in apcList:
        print(f"{start} not a valid airport code")
        return

    if end not in apcList:
        print(f"{end} not a valid airport code")
        return

    #Finds the fare cost of both start and end airports
    start_record = next((record for record in apc_agfDict if record['Airport Code'] == start), None)
    end_record = next((record for record in apc_agfDict if record['Airport Code'] == end), None)

    startFare = start_record['Average Fare ($)']
    endFare = end_record['Average Fare ($)']

    #created a directed graph
    G = nx.DiGraph()

    #Added nodes to the directed graph
    for record in apc_agfDict:
        G.add_node(record['Airport Code'])

    #Added weighted edges to the directed graph
    for record in apc_agfDict:
        for dest_record in apc_agfDict:
            if record['Airport Code'] != dest_record['Airport Code']:
                fare = dest_record['Average Fare ($)']
                G.add_edge(record['Airport Code'], dest_record['Airport Code'], weight=fare)

    #Calculate shortest path
    try:
        shortest_path = nx.shortest_path(G, source=start, target=end, weight='weight')
        return shortest_path
    except nx.NetworkXNoPath:
        return None

shortestPath = algo_function("JFK", "LAX")

if shortestPath:
    print("Optimized Itinerary:")
    for i in range(len(shortestPath)-1):
        start = shortestPath[i]
        end = shortestPath[i+1]
        for record in apc_agfDict:
            if record['Airport Code'] == start:
                start_name = start
                start_avg_fare = record['Average Fare ($)']
            if record['Airport Code'] == end:
                end_name = end
                end_avg_fare = record['Average Fare ($)']
        print(f"From {start_name} to {end_name}, Average Fare: ${end_avg_fare}")
else:
    print("No valid itinerary found.")