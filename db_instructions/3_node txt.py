e = open('nodes_clean.csv')
rows = e.readlines()
e.close()

info = {}
for row in rows:
    s = row.split(',')
    n = ['', '', '', '', '', '']
    n[0] = s[0]
    n[1] = s[2]
    n[2] = s[1]
    n[3] = s[3]
    n[4] = s[4]
    n[5] = s[5]
    for j in range(6, len(s)):
        n[5] += ', ' + s[j]
    for i in range (6):
        n[i] = n[i].replace('"', '')
        n[i] = n[i].replace('\n', '')
        n[i] = ' '.join(n[i].split())
        if len(n[i]) > 1:
            if n[i][0]  == ' ': n[i] = n[i][1:]
            if n[i][-1] == ' ': n[i] = n[i][:-1]
    info[n[0]] = n


f = open('edges.csv')
lines = f.readlines()
f.close()

edges = {}
for line in lines:
    l = line.split(',')
    if l[0] not in edges:
        edges[l[0]] = [[],[],[],[],[]]
    if l[1] not in edges:
        edges[l[1]] = [[],[],[],[],[]]

for line in lines:
    l = line.split(',')
    if float(l[2]) < 0.4:
        edges[l[0]][0].append(l[1])
        edges[l[1]][0].append(l[0])
    elif float(l[2]) < 0.5:
        edges[l[0]][1].append(l[1])
        edges[l[1]][1].append(l[0])
    elif float(l[2]) < 0.7:
        edges[l[0]][2].append(l[1])
        edges[l[1]][2].append(l[0])
    elif float(l[2]) < 0.9:
        edges[l[0]][3].append(l[1])
        edges[l[1]][3].append(l[0])
    else:
        edges[l[0]][4].append(l[1])
        edges[l[1]][4].append(l[0])
        
         
w = open("nodes.txt" , "w")
w.write('{')
for key in info:
    if (key in edges):
        n = info[key]
        w.write(n[0] + ':{')
        w.write('first:"' + n[1] + '",')
        w.write('last:"'  + n[2] + '",')
        w.write('birth:"' + n[3] + '",')
        w.write('death:"' + n[4] + '",')
        w.write('occup:"' + n[5] + '",')
        w.write('uncertain:"'   + ', '.join(edges[key][0]) + '",')
        w.write('unlikely:"'    + ', '.join(edges[key][1]) + '",')
        w.write('possible:"'    + ', '.join(edges[key][2]) + '",')
        w.write('likely:"'      + ', '.join(edges[key][3]) + '",')
        w.write('certain:"'     + ', '.join(edges[key][4]) + '"},\n')
w.write('}')
w.close()
