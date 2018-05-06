import csv
import json


def getLap(row):
    return {'pit': row[20], 's1': row[6], 's2': row[8], 's3': row[10], 'totalTime': row[3]}

def parseFile(year):
    print(year)
    filename = str(year) + '.csv'
    with open(filename, 'r') as csvfile:
        data = {}
        reader = csv.reader(csvfile, delimiter=';', quotechar='|')

        # skip the header
        next(reader, None)

        isFirst = True
        team = ''
        driver = ''
        lapCounter = 0

        for row in reader:
            if (team == row[23]):
                if not data[team]['drivers'].__contains__(row[19]):
                    # new driver record
                    driver = row[19]
                    data[team]['drivers'].append(driver)

                # write lap
                data[team]['laptimes'].append(getLap(row))
                lapCounter += 1

            else:
                if not isFirst:
                    # finish last team record
                    data[team]['totalLaps'] = lapCounter
                    lapCounter = 0
                else:
                    isFirst = False

                # new team record
                team = row[23]

                data[team] = {'manufacturer': row[24], 'finalClassification': '', 'class': row[21], 'totalLaps': '',
                                'drivers': [], 'laptimes': []}
                data[team]['laptimes'].append(getLap(row))
                lapCounter += 1

        return data


completeData = {}

for year in range (2015, 2018):
    completeData[year] = parseFile(year)



with open('data.json', 'w') as datafile:
    json.dump(completeData, datafile)



