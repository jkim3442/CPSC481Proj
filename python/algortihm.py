import pandas as pd

df = pd.read_html("https://www.transtats.bts.gov/AverageFare/?Year=2021")
print(len(df))