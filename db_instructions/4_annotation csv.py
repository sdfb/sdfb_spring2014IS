f = open('edges.csv')
lines = f.readlines()
f.close()

uncertain = []
unlikely = []
possible = []
likely = []
certain = []

for line in lines:
    l = line.split(',')
    if float(l[2]) < 0.4:
        uncertain.append(l[0] + "," + l[1] + "\n")
    elif float(l[2]) < 0.5:
        unlikely.append(l[0] + "," + l[1] + "\n")
    elif float(l[2]) < 0.7:
        possible.append(l[0] + "," + l[1] + "\n")
    elif float(l[2]) < 0.9:
        likely.append(l[0] + "," + l[1] + "\n")
    else:
        certain.append(l[0] + "," + l[1] + "\n")
  
w = open("uncertain.csv" , "w")
for i in uncertain:
    w.write(i)
w.close()

w = open("unlikely.csv" , "w")
for i in unlikely:
    w.write(i)
w.close()

w = open("possible.csv" , "w")
for i in possible:
    w.write(i)
w.close()

w = open("likely.csv" , "w")
for i in likely:
    w.write(i)
w.close()

w = open("certain.csv" , "w")
for i in certain:
    w.write(i)
w.close()
