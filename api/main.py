def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

# Find factorial of the first 5 odd numbers
odd_numbers = [1, 3, 5, 7, 9]

x = input("Enter a number\n")

for num in odd_numbers:
    result = factorial(num)
    print(f'The factorial of {num} is: {result}')
    