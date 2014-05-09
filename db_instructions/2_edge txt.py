import math

e = open('nodes_clean.csv')
rows = e.readlines()
e.close()

ids = []
for row in rows:
    ids.append(row.split(',')[0])

f = open('edges_matrix.csv')
lines = f.readlines()
f.close()

edges = []
for line in lines:
    line = line.replace('\n', '')
    l = line.split(',')
    id1 = int(l[0][1:])
    id2 = int(l[1][1:])
    if str(id1) in ids and str(id2) in ids:
        if id1 < id2:
            edges.append(str(id1)+','+str(id2)+','+l[2])
        else:
            edges.append(str(id2)+','+str(id1)+','+l[2])

print len(edges)
x = open("edges.csv" , "w")
for edge in sorted(edges):
    x.write(edge)
    x.write('\n')
x.close()
