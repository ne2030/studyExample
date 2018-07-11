number = int(input())
if number < 1 or number > 100:
    print ('error')
else:
    if (number % 2) == 0:
        print ('even')
    else: print ('odd')