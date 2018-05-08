import csv
import json
import re


def getMillis(time):
    millis = 0

    if time == '':
        return 0

    if '.' in time:
        splitTime = str(time).split('.')
        millis = int(splitTime[1])
        splitTime = str(splitTime[0]).split(':')
    else:
        splitTime = str(time).split(':')

    if len(splitTime) == 3:
        millis += 1000 * int(splitTime[2])
        millis += 60 * 1000 * int(splitTime[1])
        millis += 60 * 60 * 1000 * int(splitTime[0])
    elif len(splitTime) == 2:
        millis += 1000 * int(splitTime[1])
        millis += 60 * 1000 * int(splitTime[0])
    else:
        millis += 1000 * int(splitTime[0])

    return millis

def getLap(row):
    return {'pit': getMillis(row[20]), 's1': getMillis(row[6]), 's2': getMillis(row[8]), 's3': getMillis(row[10]), 'totalTime': getMillis(row[3])}

def parseFile(year):
    print(year)
    filename = str(year) + '.csv'
    with open(filename, 'r') as csvfile:
        data = {}
        reader = csv.reader(csvfile, delimiter=';', quotechar='|')

        # skip the header
        next(reader, None)

        isFirst = True
        teamId = -1
        driver = ''
        lapCounter = 0

        for row in reader:
            if (teamId == row[0]):
                if not data[teamId]['drivers'].__contains__(row[19]):
                    # new driver record
                    driver = row[19]
                    data[teamId]['drivers'].append(driver)

                # write lap
                data[teamId]['laptimes'].append(getLap(row))
                lapCounter += 1

                #check if team has finished the race or was DQ or retired
                pattern = re.compile("24:\d{2}:\d{2}.?\d*")
                if pattern.match(row[13]):
                    data[teamId]['hasFinished'] = True
                else:
                    data[teamId]['hasFinished'] = False

            else:
                if not isFirst:
                    # finish last team record
                    data[teamId]['totalLaps'] = lapCounter
                    lapCounter = 0

                else:
                    isFirst = False

                # new team record
                teamId = row[0]

                data[teamId] = {'name': row[23], 'manufacturer': row[24], 'finalClassification': '', 'class': row[21], 'totalLaps': '',
                                'drivers': [], 'laptimes': []}
                data[teamId]['laptimes'].append(getLap(row))
                lapCounter += 1


        return data


completeData = {}

for year in range (2015, 2018):
    completeData[year] = parseFile(year)



with open('data.json', 'w') as datafile:
    json.dump(completeData, datafile)
