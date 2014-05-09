import math

e = open('nodes_matrix.csv')
rows = e.readlines()
e.close()

info = {}
for row in rows:
    s = row.split(',')
    n = ['', '', '', '', '', '']
    n[0] = s[0]
    n[1] = s[1]
    if '"' in s[1]:
        n[2] = s[2]
        i = 3
        if '"' not in s[2]:
            n[1] += ' ' + s[3]
            i+= 1
            if '"' not in s[3]:
                n[1] += ' ' + s[4]
                i+= 1
        n[3] = s[i]
        i+=1
        n[4] = s[i]
        i+=1
        if (n[3] == 'NA'): n[3] = s[i]
        i+=1
        if (n[4] == 'NA'): n[4] = s[i]
        i+=1
        n[5] = s[i]
        for j in range(i + 1, len(s)):
            n[5] += ',' + s[j]
    else:
        n[3] = s[2]
        n[4] = s[3]
        if (n[3] == 'NA'): n[3] = s[4]
        if (n[4] == 'NA'): n[4] = s[5]
        n[5] = s[6]
        for j in range(7, len(s)):
            n[5] += ',' + s[j]

    for i in range (6):
        n[i] = n[i].replace('"', '')
        n[i] = n[i].replace('\n', '')
        n[i] = ' '.join(n[i].split())
        if len(n[i]) > 1:
            if n[i][0] == ' ': n[i] = n[i][1:]
            if n[i][-1] == ' ': n[i] = n[i][:-1]
    if (len(n[5]) > 1): 
        n[5] = '"' + n[5][0].upper() + n[5][1:] + '"'
    info[n[0]] = n

f = open('edges_matrix.csv')
lines = f.readlines()
f.close()

nodes = []
for line in lines:
    l = line.split(',')
    if l[0] not in nodes:
        nodes.append(l[0])
    if l[1] not in nodes:
        nodes.append(l[1])

w = open("nodes_clean.csv" , "w")
for key in info:
    if key in nodes and info[key][3] != 'NA' and info[key][0][0] != '2':
        w.write(str(int(info[key][0][1:])) + ',')
        w.write(','.join(info[key][1:]))
        w.write('\n')
w.close()
