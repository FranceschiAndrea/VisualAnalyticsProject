from numpy.core.fromnumeric import size
import pandas as pd
import math 
import csv
import numpy as np
from matplotlib import pyplot as plt
from sklearn.decomposition import PCA
from sklearn import preprocessing
import warnings
warnings.filterwarnings("ignore")

countryes = []

#------------ Deaths by causes and total ---------------
#------------ Air Cancer  ---------------
df_TrachealCancer = pd.read_csv('dataset/deaths_by_cancer/deaths_by_cancer_air/IHME-GBD_2019_DATA-95cedfd8-1.csv', usecols = ['location_name','year','val']) 
df2_TrachealCancer = df_TrachealCancer[['location_name','year','val']]    # selects two of the columns in your file

df = pd.DataFrame(df2_TrachealCancer,columns=['location_name','year','val'])
df['2000'] = df['year'].apply(lambda x: 'True' if x == 2000 else 'False')
df['2001'] = df['year'].apply(lambda x: 'True' if x == 2001 else 'False')
df['2002'] = df['year'].apply(lambda x: 'True' if x == 2002 else 'False')
df['2003'] = df['year'].apply(lambda x: 'True' if x == 2003 else 'False')
df['2004'] = df['year'].apply(lambda x: 'True' if x == 2004 else 'False')
df['2005'] = df['year'].apply(lambda x: 'True' if x == 2005 else 'False')
df['2006'] = df['year'].apply(lambda x: 'True' if x == 2006 else 'False')
df['2007'] = df['year'].apply(lambda x: 'True' if x == 2007 else 'False')
df['2008'] = df['year'].apply(lambda x: 'True' if x == 2008 else 'False')
df['2009'] = df['year'].apply(lambda x: 'True' if x == 2009 else 'False')
df['2010'] = df['year'].apply(lambda x: 'True' if x == 2010 else 'False')
df['2011'] = df['year'].apply(lambda x: 'True' if x == 2011 else 'False')
df['2012'] = df['year'].apply(lambda x: 'True' if x == 2012 else 'False')
df['2013'] = df['year'].apply(lambda x: 'True' if x == 2013 else 'False')
df['2014'] = df['year'].apply(lambda x: 'True' if x == 2014 else 'False')
df['2015'] = df['year'].apply(lambda x: 'True' if x == 2015 else 'False')



df_AC_2000=pd.DataFrame(df.loc[df['2000']== 'True'],columns=['location_name','val'])
df_AC_2000['val'] = df_AC_2000['val'].astype(int)
df_AC_2000 = df_AC_2000.sort_values(by=['location_name'], ascending=True)

df_AC_2001=pd.DataFrame(df.loc[df['2001']== 'True'],columns=['location_name','val'])
df_AC_2001['val'] = df_AC_2001['val'].astype(int)
df_AC_2001= df_AC_2001.sort_values(by=['location_name'], ascending=True)

df_AC_2002=pd.DataFrame(df.loc[df['2002']== 'True'],columns=['location_name','val'])
df_AC_2002['val'] = df_AC_2002['val'].astype(int)
df_AC_2002 = df_AC_2002.sort_values(by=['location_name'], ascending=True)

df_AC_2003=pd.DataFrame(df.loc[df['2003']== 'True'],columns=['location_name','val'])
df_AC_2003['val'] = df_AC_2003['val'].astype(int)
df_AC_2003 = df_AC_2003.sort_values(by=['location_name'], ascending=True)

df_AC_2004=pd.DataFrame(df.loc[df['2004']== 'True'],columns=['location_name','val'])
df_AC_2004['val'] = df_AC_2004['val'].astype(int)
df_AC_2004 = df_AC_2004.sort_values(by=['location_name'], ascending=True)


df_AC_2005=pd.DataFrame(df.loc[df['2005']== 'True'],columns=['location_name','val'])
df_AC_2005['val'] = df_AC_2005['val'].astype(int)
df_AC_2005 = df_AC_2005.sort_values(by=['location_name'], ascending=True)

df_AC_2006=pd.DataFrame(df.loc[df['2006']== 'True'],columns=['location_name','val'])
df_AC_2006['val'] = df_AC_2006['val'].astype(int)
df_AC_2006 = df_AC_2006.sort_values(by=['location_name'], ascending=True)

df_AC_2007=pd.DataFrame(df.loc[df['2007']== 'True'],columns=['location_name','val'])
df_AC_2007['val'] = df_AC_2007['val'].astype(int)
df_AC_2007 = df_AC_2007.sort_values(by=['location_name'], ascending=True)


df_AC_2008=pd.DataFrame(df.loc[df['2008']== 'True'],columns=['location_name','val'])
df_AC_2008['val'] = df_AC_2008['val'].astype(int)
df_AC_2008 = df_AC_2008.sort_values(by=['location_name'], ascending=True)

df_AC_2009=pd.DataFrame(df.loc[df['2009']== 'True'],columns=['location_name','val'])
df_AC_2009['val'] = df_AC_2009['val'].astype(int)
df_AC_2009 = df_AC_2009.sort_values(by=['location_name'], ascending=True)

df_AC_2010=pd.DataFrame(df.loc[df['2010']== 'True'],columns=['location_name','val'])
df_AC_2010['val'] = df_AC_2010['val'].astype(int)
df_AC_2010 = df_AC_2010.sort_values(by=['location_name'], ascending=True)

df_AC_2011=pd.DataFrame(df.loc[df['2011']== 'True'],columns=['location_name','val'])
df_AC_2011['val'] = df_AC_2011['val'].astype(int)
df_AC_2011 = df_AC_2011.sort_values(by=['location_name'], ascending=True)


df_AC_2012=pd.DataFrame(df.loc[df['2012']== 'True'],columns=['location_name','val'])
df_AC_2012['val'] = df_AC_2012['val'].astype(int)
df_AC_2012 = df_AC_2012.sort_values(by=['location_name'], ascending=True)

df_AC_2013=pd.DataFrame(df.loc[df['2013']== 'True'],columns=['location_name','val'])
df_AC_2013['val'] = df_AC_2013['val'].astype(int)
df_AC_2013 = df_AC_2013.sort_values(by=['location_name'], ascending=True)

df_AC_2014=pd.DataFrame(df.loc[df['2014']== 'True'],columns=['location_name','val'])
df_AC_2014['val'] = df_AC_2014['val'].astype(int)
df_AC_2014 = df_AC_2014.sort_values(by=['location_name'], ascending=True)

df_AC_2015=pd.DataFrame(df.loc[df['2015']== 'True'],columns=['location_name','val'])
df_AC_2015['val'] = df_AC_2015['val'].astype(int)
df_AC_2015 = df_AC_2015.sort_values(by=['location_name'], ascending=True)

df_AC_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_AC_in_list.append(np.array(df_AC_200" + str(i) + "['val']).tolist())")
    else:
        exec( "df_AC_in_list.append(np.array(df_AC_20" + str(i) + "['val']).tolist())")

print(size(df_AC_in_list))

#------------ Total Cancer  ---------------
df_TotalCancer = pd.read_csv ('dataset/deaths_by_cancer/deaths_by_cancer_total/IHME-GBD_2019_DATA-e1c2eb10-1.csv',usecols = ['location_name','year','val']) 
df2_TotalCancer = df_TotalCancer[['location_name','year','val']]    # selects two of the columns in your file


df = pd.DataFrame(df2_TotalCancer,columns=['location_name','year','val'])
df['2000'] = df['year'].apply(lambda x: 'True' if x == 2000 else 'False')
df['2001'] = df['year'].apply(lambda x: 'True' if x == 2001 else 'False')
df['2002'] = df['year'].apply(lambda x: 'True' if x == 2002 else 'False')
df['2003'] = df['year'].apply(lambda x: 'True' if x == 2003 else 'False')
df['2004'] = df['year'].apply(lambda x: 'True' if x == 2004 else 'False')
df['2005'] = df['year'].apply(lambda x: 'True' if x == 2005 else 'False')
df['2006'] = df['year'].apply(lambda x: 'True' if x == 2006 else 'False')
df['2007'] = df['year'].apply(lambda x: 'True' if x == 2007 else 'False')
df['2008'] = df['year'].apply(lambda x: 'True' if x == 2008 else 'False')
df['2009'] = df['year'].apply(lambda x: 'True' if x == 2009 else 'False')
df['2010'] = df['year'].apply(lambda x: 'True' if x == 2010 else 'False')
df['2011'] = df['year'].apply(lambda x: 'True' if x == 2011 else 'False')
df['2012'] = df['year'].apply(lambda x: 'True' if x == 2012 else 'False')
df['2013'] = df['year'].apply(lambda x: 'True' if x == 2013 else 'False')
df['2014'] = df['year'].apply(lambda x: 'True' if x == 2014 else 'False')
df['2015'] = df['year'].apply(lambda x: 'True' if x == 2015 else 'False')



df_TC_2000=pd.DataFrame(df.loc[df['2000']== 'True'],columns=['location_name','val'])
df_TC_2000['val'] = df_TC_2000['val'].astype(int)
df_TC_2000 = df_TC_2000.sort_values(by=['location_name'], ascending=True)

df_TC_2001=pd.DataFrame(df.loc[df['2001']== 'True'],columns=['location_name','val'])
df_TC_2001['val'] = df_TC_2001['val'].astype(int)
df_TC_2001= df_TC_2001.sort_values(by=['location_name'], ascending=True)

df_TC_2002=pd.DataFrame(df.loc[df['2002']== 'True'],columns=['location_name','val'])
df_TC_2002['val'] = df_TC_2002['val'].astype(int)
df_TC_2002 = df_TC_2002.sort_values(by=['location_name'], ascending=True)

df_TC_2003=pd.DataFrame(df.loc[df['2003']== 'True'],columns=['location_name','val'])
df_TC_2003['val'] = df_TC_2003['val'].astype(int)
df_TC_2003 = df_TC_2003.sort_values(by=['location_name'], ascending=True)

df_TC_2004=pd.DataFrame(df.loc[df['2004']== 'True'],columns=['location_name','val'])
df_TC_2004['val'] = df_TC_2004['val'].astype(int)
df_TC_2004 = df_TC_2004.sort_values(by=['location_name'], ascending=True)


df_TC_2005=pd.DataFrame(df.loc[df['2005']== 'True'],columns=['location_name','val'])
df_TC_2005['val'] = df_TC_2005['val'].astype(int)
df_TC_2005 = df_TC_2005.sort_values(by=['location_name'], ascending=True)

df_TC_2006=pd.DataFrame(df.loc[df['2006']== 'True'],columns=['location_name','val'])
df_TC_2006['val'] = df_TC_2006['val'].astype(int)
df_TC_2006 = df_TC_2006.sort_values(by=['location_name'], ascending=True)

df_TC_2007=pd.DataFrame(df.loc[df['2007']== 'True'],columns=['location_name','val'])
df_TC_2007['val'] = df_TC_2007['val'].astype(int)
df_TC_2007 = df_TC_2007.sort_values(by=['location_name'], ascending=True)


df_TC_2008=pd.DataFrame(df.loc[df['2008']== 'True'],columns=['location_name','val'])
df_TC_2008['val'] = df_TC_2008['val'].astype(int)
df_TC_2008 = df_TC_2008.sort_values(by=['location_name'], ascending=True)

df_TC_2009=pd.DataFrame(df.loc[df['2009']== 'True'],columns=['location_name','val'])
df_TC_2009['val'] = df_TC_2009['val'].astype(int)
df_TC_2009 = df_TC_2009.sort_values(by=['location_name'], ascending=True)

df_TC_2010=pd.DataFrame(df.loc[df['2010']== 'True'],columns=['location_name','val'])
df_TC_2010['val'] = df_TC_2010['val'].astype(int)
df_TC_2010 = df_TC_2010.sort_values(by=['location_name'], ascending=True)

df_TC_2011=pd.DataFrame(df.loc[df['2011']== 'True'],columns=['location_name','val'])
df_TC_2011['val'] = df_TC_2011['val'].astype(int)
df_TC_2011 = df_TC_2011.sort_values(by=['location_name'], ascending=True)


df_TC_2012=pd.DataFrame(df.loc[df['2012']== 'True'],columns=['location_name','val'])
df_TC_2012['val'] = df_TC_2012['val'].astype(int)
df_TC_2012 = df_TC_2012.sort_values(by=['location_name'], ascending=True)

df_TC_2013=pd.DataFrame(df.loc[df['2013']== 'True'],columns=['location_name','val'])
df_TC_2013['val'] = df_TC_2013['val'].astype(int)
df_TC_2013 = df_TC_2013.sort_values(by=['location_name'], ascending=True)

df_TC_2014=pd.DataFrame(df.loc[df['2014']== 'True'],columns=['location_name','val'])
df_TC_2014['val'] = df_TC_2014['val'].astype(int)
df_TC_2014 = df_TC_2014.sort_values(by=['location_name'], ascending=True)

df_TC_2015=pd.DataFrame(df.loc[df['2015']== 'True'],columns=['location_name','val'])
df_TC_2015['val'] = df_TC_2015['val'].astype(int)
df_TC_2015 = df_TC_2015.sort_values(by=['location_name'], ascending=True)

df_TC_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_TC_in_list.append(np.array(df_TC_200" + str(i) + "['val']).tolist())")
    else:
        exec( "df_TC_in_list.append(np.array(df_TC_20" + str(i) + "['val']).tolist())")
print(size(df_TC_in_list))

#------------ Chronical Pulmonary ---------------
df_ChRespDis= pd.read_csv ('dataset/deaths_by_chronical_respiratory_desease/deaths_by_chronical_respiratory_desease_pulmonary/IHME-GBD_2019_DATA-744e9c90-1.csv',usecols = ['location_name','year','val']) 
df2_ChRespDis= df_ChRespDis[['location_name','year','val']]    # selects two of the columns in your file


df = pd.DataFrame(df2_ChRespDis,columns=['location_name','year','val'])
df['2000'] = df['year'].apply(lambda x: 'True' if x == 2000 else 'False')
df['2001'] = df['year'].apply(lambda x: 'True' if x == 2001 else 'False')
df['2002'] = df['year'].apply(lambda x: 'True' if x == 2002 else 'False')
df['2003'] = df['year'].apply(lambda x: 'True' if x == 2003 else 'False')
df['2004'] = df['year'].apply(lambda x: 'True' if x == 2004 else 'False')
df['2005'] = df['year'].apply(lambda x: 'True' if x == 2005 else 'False')
df['2006'] = df['year'].apply(lambda x: 'True' if x == 2006 else 'False')
df['2007'] = df['year'].apply(lambda x: 'True' if x == 2007 else 'False')
df['2008'] = df['year'].apply(lambda x: 'True' if x == 2008 else 'False')
df['2009'] = df['year'].apply(lambda x: 'True' if x == 2009 else 'False')
df['2010'] = df['year'].apply(lambda x: 'True' if x == 2010 else 'False')
df['2011'] = df['year'].apply(lambda x: 'True' if x == 2011 else 'False')
df['2012'] = df['year'].apply(lambda x: 'True' if x == 2012 else 'False')
df['2013'] = df['year'].apply(lambda x: 'True' if x == 2013 else 'False')
df['2014'] = df['year'].apply(lambda x: 'True' if x == 2014 else 'False')
df['2015'] = df['year'].apply(lambda x: 'True' if x == 2015 else 'False')



df_CRD_2000=pd.DataFrame(df.loc[df['2000']== 'True'],columns=['location_name','val'])
df_CRD_2000['val'] = df_CRD_2000['val'].astype(int)
df_CRD_2000 = df_CRD_2000.sort_values(by=['location_name'], ascending=True)

df_CRD_2001=pd.DataFrame(df.loc[df['2001']== 'True'],columns=['location_name','val'])
df_CRD_2001['val'] = df_CRD_2001['val'].astype(int)
df_CRD_2001= df_CRD_2001.sort_values(by=['location_name'], ascending=True)

df_CRD_2002=pd.DataFrame(df.loc[df['2002']== 'True'],columns=['location_name','val'])
df_CRD_2002['val'] = df_CRD_2002['val'].astype(int)
df_CRD_2002 = df_CRD_2002.sort_values(by=['location_name'], ascending=True)

df_CRD_2003=pd.DataFrame(df.loc[df['2003']== 'True'],columns=['location_name','val'])
df_CRD_2003['val'] = df_CRD_2003['val'].astype(int)
df_CRD_2003 = df_CRD_2003.sort_values(by=['location_name'], ascending=True)

df_CRD_2004=pd.DataFrame(df.loc[df['2004']== 'True'],columns=['location_name','val'])
df_CRD_2004['val'] = df_CRD_2004['val'].astype(int)
df_CRD_2004 = df_CRD_2004.sort_values(by=['location_name'], ascending=True)


df_CRD_2005=pd.DataFrame(df.loc[df['2005']== 'True'],columns=['location_name','val'])
df_CRD_2005['val'] = df_CRD_2005['val'].astype(int)
df_CRD_2005 = df_CRD_2005.sort_values(by=['location_name'], ascending=True)

df_CRD_2006=pd.DataFrame(df.loc[df['2006']== 'True'],columns=['location_name','val'])
df_CRD_2006['val'] = df_CRD_2006['val'].astype(int)
df_CRD_2006 = df_CRD_2006.sort_values(by=['location_name'], ascending=True)

df_CRD_2007=pd.DataFrame(df.loc[df['2007']== 'True'],columns=['location_name','val'])
df_CRD_2007['val'] = df_CRD_2007['val'].astype(int)
df_CRD_2007 = df_CRD_2007.sort_values(by=['location_name'], ascending=True)


df_CRD_2008=pd.DataFrame(df.loc[df['2008']== 'True'],columns=['location_name','val'])
df_CRD_2008['val'] = df_CRD_2008['val'].astype(int)
df_CRD_2008 = df_CRD_2008.sort_values(by=['location_name'], ascending=True)

df_CRD_2009=pd.DataFrame(df.loc[df['2009']== 'True'],columns=['location_name','val'])
df_CRD_2009['val'] = df_CRD_2009['val'].astype(int)
df_CRD_2009 = df_CRD_2009.sort_values(by=['location_name'], ascending=True)

df_CRD_2010=pd.DataFrame(df.loc[df['2010']== 'True'],columns=['location_name','val'])
df_CRD_2010['val'] = df_CRD_2010['val'].astype(int)
df_CRD_2010 = df_CRD_2010.sort_values(by=['location_name'], ascending=True)

df_CRD_2011=pd.DataFrame(df.loc[df['2011']== 'True'],columns=['location_name','val'])
df_CRD_2011['val'] = df_CRD_2011['val'].astype(int)
df_CRD_2011 = df_CRD_2011.sort_values(by=['location_name'], ascending=True)


df_CRD_2012=pd.DataFrame(df.loc[df['2012']== 'True'],columns=['location_name','val'])
df_CRD_2012['val'] = df_CRD_2012['val'].astype(int)
df_CRD_2012 = df_CRD_2012.sort_values(by=['location_name'], ascending=True)

df_CRD_2013=pd.DataFrame(df.loc[df['2013']== 'True'],columns=['location_name','val'])
df_CRD_2013['val'] = df_CRD_2013['val'].astype(int)
df_CRD_2013 = df_CRD_2013.sort_values(by=['location_name'], ascending=True)

df_CRD_2014=pd.DataFrame(df.loc[df['2014']== 'True'],columns=['location_name','val'])
df_CRD_2014['val'] = df_CRD_2014['val'].astype(int)
df_CRD_2014 = df_CRD_2014.sort_values(by=['location_name'], ascending=True)

df_CRD_2015=pd.DataFrame(df.loc[df['2015']== 'True'],columns=['location_name','val'])
df_CRD_2015['val'] = df_CRD_2015['val'].astype(int)
df_CRD_2015 = df_CRD_2015.sort_values(by=['location_name'], ascending=True)

df_CRD_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_CRD_in_list.append(np.array(df_CRD_200" + str(i) + "['val']).tolist())")
    else:
        exec( "df_CRD_in_list.append(np.array(df_CRD_20" + str(i) + "['val']).tolist())")

print(size(df_CRD_in_list))

#------------ Chronical Pneumoconiosis ---------------
df_Pne= pd.read_csv ('dataset/deaths_by_chronical_respiratory_desease/deaths_by_chronical_respiratory_desease_pneumoconiosis/IHME-GBD_2019_DATA-df10a0ae-1.csv',usecols = ['location_name','year','val']) 
df2_Pne= df_Pne[['location_name','year','val']]    # selects two of the columns in your file


df = pd.DataFrame(df2_Pne,columns=['location_name','year','val'])
df['2000'] = df['year'].apply(lambda x: 'True' if x == 2000 else 'False')
df['2001'] = df['year'].apply(lambda x: 'True' if x == 2001 else 'False')
df['2002'] = df['year'].apply(lambda x: 'True' if x == 2002 else 'False')
df['2003'] = df['year'].apply(lambda x: 'True' if x == 2003 else 'False')
df['2004'] = df['year'].apply(lambda x: 'True' if x == 2004 else 'False')
df['2005'] = df['year'].apply(lambda x: 'True' if x == 2005 else 'False')
df['2006'] = df['year'].apply(lambda x: 'True' if x == 2006 else 'False')
df['2007'] = df['year'].apply(lambda x: 'True' if x == 2007 else 'False')
df['2008'] = df['year'].apply(lambda x: 'True' if x == 2008 else 'False')
df['2009'] = df['year'].apply(lambda x: 'True' if x == 2009 else 'False')
df['2010'] = df['year'].apply(lambda x: 'True' if x == 2010 else 'False')
df['2011'] = df['year'].apply(lambda x: 'True' if x == 2011 else 'False')
df['2012'] = df['year'].apply(lambda x: 'True' if x == 2012 else 'False')
df['2013'] = df['year'].apply(lambda x: 'True' if x == 2013 else 'False')
df['2014'] = df['year'].apply(lambda x: 'True' if x == 2014 else 'False')
df['2015'] = df['year'].apply(lambda x: 'True' if x == 2015 else 'False')



df_PNE_2000=pd.DataFrame(df.loc[df['2000']== 'True'],columns=['location_name','val'])
df_PNE_2000['val'] = df_PNE_2000['val'].astype(int)
df_PNE_2000 = df_PNE_2000.sort_values(by=['location_name'], ascending=True)

df_PNE_2001=pd.DataFrame(df.loc[df['2001']== 'True'],columns=['location_name','val'])
df_PNE_2001['val'] = df_PNE_2001['val'].astype(int)
df_PNE_2001= df_PNE_2001.sort_values(by=['location_name'], ascending=True)

df_PNE_2002=pd.DataFrame(df.loc[df['2002']== 'True'],columns=['location_name','val'])
df_PNE_2002['val'] = df_PNE_2002['val'].astype(int)
df_PNE_2002 = df_PNE_2002.sort_values(by=['location_name'], ascending=True)

df_PNE_2003=pd.DataFrame(df.loc[df['2003']== 'True'],columns=['location_name','val'])
df_PNE_2003['val'] = df_PNE_2003['val'].astype(int)
df_PNE_2003 = df_PNE_2003.sort_values(by=['location_name'], ascending=True)

df_PNE_2004=pd.DataFrame(df.loc[df['2004']== 'True'],columns=['location_name','val'])
df_PNE_2004['val'] = df_PNE_2004['val'].astype(int)
df_PNE_2004 = df_PNE_2004.sort_values(by=['location_name'], ascending=True)


df_PNE_2005=pd.DataFrame(df.loc[df['2005']== 'True'],columns=['location_name','val'])
df_PNE_2005['val'] = df_PNE_2005['val'].astype(int)
df_PNE_2005 = df_PNE_2005.sort_values(by=['location_name'], ascending=True)

df_PNE_2006=pd.DataFrame(df.loc[df['2006']== 'True'],columns=['location_name','val'])
df_PNE_2006['val'] = df_PNE_2006['val'].astype(int)
df_PNE_2006 = df_PNE_2006.sort_values(by=['location_name'], ascending=True)

df_PNE_2007=pd.DataFrame(df.loc[df['2007']== 'True'],columns=['location_name','val'])
df_PNE_2007['val'] = df_PNE_2007['val'].astype(int)
df_PNE_2007 = df_PNE_2007.sort_values(by=['location_name'], ascending=True)


df_PNE_2008=pd.DataFrame(df.loc[df['2008']== 'True'],columns=['location_name','val'])
df_PNE_2008['val'] = df_PNE_2008['val'].astype(int)
df_PNE_2008 = df_PNE_2008.sort_values(by=['location_name'], ascending=True)

df_PNE_2009=pd.DataFrame(df.loc[df['2009']== 'True'],columns=['location_name','val'])
df_PNE_2009['val'] = df_PNE_2009['val'].astype(int)
df_PNE_2009 = df_PNE_2009.sort_values(by=['location_name'], ascending=True)

df_PNE_2010=pd.DataFrame(df.loc[df['2010']== 'True'],columns=['location_name','val'])
df_PNE_2010['val'] = df_PNE_2010['val'].astype(int)
df_PNE_2010 = df_PNE_2010.sort_values(by=['location_name'], ascending=True)

df_PNE_2011=pd.DataFrame(df.loc[df['2011']== 'True'],columns=['location_name','val'])
df_PNE_2011['val'] = df_PNE_2011['val'].astype(int)
df_PNE_2011 = df_PNE_2011.sort_values(by=['location_name'], ascending=True)


df_PNE_2012=pd.DataFrame(df.loc[df['2012']== 'True'],columns=['location_name','val'])
df_PNE_2012['val'] = df_PNE_2012['val'].astype(int)
df_PNE_2012 = df_PNE_2012.sort_values(by=['location_name'], ascending=True)

df_PNE_2013=pd.DataFrame(df.loc[df['2013']== 'True'],columns=['location_name','val'])
df_PNE_2013['val'] = df_PNE_2013['val'].astype(int)
df_PNE_2013 = df_PNE_2013.sort_values(by=['location_name'], ascending=True)

df_PNE_2014=pd.DataFrame(df.loc[df['2014']== 'True'],columns=['location_name','val'])
df_PNE_2014['val'] = df_PNE_2014['val'].astype(int)
df_PNE_2014 = df_PNE_2014.sort_values(by=['location_name'], ascending=True)

df_PNE_2015=pd.DataFrame(df.loc[df['2015']== 'True'],columns=['location_name','val'])
df_PNE_2015['val'] = df_PNE_2015['val'].astype(int)
df_PNE_2015 = df_PNE_2015.sort_values(by=['location_name'], ascending=True)

df_PNE_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_PNE_in_list.append(np.array(df_PNE_200" + str(i) + "['val']).tolist())")
    else:
        exec( "df_PNE_in_list.append(np.array(df_PNE_20" + str(i) + "['val']).tolist())")

print(size(df_PNE_in_list))

#------------ Chronical Asthma ---------------
df_As= pd.read_csv ('dataset/deaths_by_chronical_respiratory_desease/deaths_by_chronical_respiratory_desease_asthma/IHME-GBD_2019_DATA-4c1f99bd-1.csv',usecols = ['location_name','year','val']) 
df2_As= df_As[['location_name','year','val']]    # selects two of the columns in your file


df = pd.DataFrame(df2_As,columns=['location_name','year','val'])
df['2000'] = df['year'].apply(lambda x: 'True' if x == 2000 else 'False')
df['2001'] = df['year'].apply(lambda x: 'True' if x == 2001 else 'False')
df['2002'] = df['year'].apply(lambda x: 'True' if x == 2002 else 'False')
df['2003'] = df['year'].apply(lambda x: 'True' if x == 2003 else 'False')
df['2004'] = df['year'].apply(lambda x: 'True' if x == 2004 else 'False')
df['2005'] = df['year'].apply(lambda x: 'True' if x == 2005 else 'False')
df['2006'] = df['year'].apply(lambda x: 'True' if x == 2006 else 'False')
df['2007'] = df['year'].apply(lambda x: 'True' if x == 2007 else 'False')
df['2008'] = df['year'].apply(lambda x: 'True' if x == 2008 else 'False')
df['2009'] = df['year'].apply(lambda x: 'True' if x == 2009 else 'False')
df['2010'] = df['year'].apply(lambda x: 'True' if x == 2010 else 'False')
df['2011'] = df['year'].apply(lambda x: 'True' if x == 2011 else 'False')
df['2012'] = df['year'].apply(lambda x: 'True' if x == 2012 else 'False')
df['2013'] = df['year'].apply(lambda x: 'True' if x == 2013 else 'False')
df['2014'] = df['year'].apply(lambda x: 'True' if x == 2014 else 'False')
df['2015'] = df['year'].apply(lambda x: 'True' if x == 2015 else 'False')



df_AS_2000=pd.DataFrame(df.loc[df['2000']== 'True'],columns=['location_name','val'])
df_AS_2000['val'] = df_AS_2000['val'].astype(int)
df_AS_2000 = df_AS_2000.sort_values(by=['location_name'], ascending=True)

df_AS_2001=pd.DataFrame(df.loc[df['2001']== 'True'],columns=['location_name','val'])
df_AS_2001['val'] = df_AS_2001['val'].astype(int)
df_AS_2001= df_AS_2001.sort_values(by=['location_name'], ascending=True)

df_AS_2002=pd.DataFrame(df.loc[df['2002']== 'True'],columns=['location_name','val'])
df_AS_2002['val'] = df_AS_2002['val'].astype(int)
df_AS_2002 = df_AS_2002.sort_values(by=['location_name'], ascending=True)

df_AS_2003=pd.DataFrame(df.loc[df['2003']== 'True'],columns=['location_name','val'])
df_AS_2003['val'] = df_AS_2003['val'].astype(int)
df_AS_2003 = df_AS_2003.sort_values(by=['location_name'], ascending=True)

df_AS_2004=pd.DataFrame(df.loc[df['2004']== 'True'],columns=['location_name','val'])
df_AS_2004['val'] = df_AS_2004['val'].astype(int)
df_AS_2004 = df_AS_2004.sort_values(by=['location_name'], ascending=True)


df_AS_2005=pd.DataFrame(df.loc[df['2005']== 'True'],columns=['location_name','val'])
df_AS_2005['val'] = df_AS_2005['val'].astype(int)
df_AS_2005 = df_AS_2005.sort_values(by=['location_name'], ascending=True)

df_AS_2006=pd.DataFrame(df.loc[df['2006']== 'True'],columns=['location_name','val'])
df_AS_2006['val'] = df_AS_2006['val'].astype(int)
df_AS_2006 = df_AS_2006.sort_values(by=['location_name'], ascending=True)

df_AS_2007=pd.DataFrame(df.loc[df['2007']== 'True'],columns=['location_name','val'])
df_AS_2007['val'] = df_AS_2007['val'].astype(int)
df_AS_2007 = df_AS_2007.sort_values(by=['location_name'], ascending=True)


df_AS_2008=pd.DataFrame(df.loc[df['2008']== 'True'],columns=['location_name','val'])
df_AS_2008['val'] = df_AS_2008['val'].astype(int)
df_AS_2008 = df_AS_2008.sort_values(by=['location_name'], ascending=True)

df_AS_2009=pd.DataFrame(df.loc[df['2009']== 'True'],columns=['location_name','val'])
df_AS_2009['val'] = df_AS_2009['val'].astype(int)
df_AS_2009 = df_AS_2009.sort_values(by=['location_name'], ascending=True)

df_AS_2010=pd.DataFrame(df.loc[df['2010']== 'True'],columns=['location_name','val'])
df_AS_2010['val'] = df_AS_2010['val'].astype(int)
df_AS_2010 = df_AS_2010.sort_values(by=['location_name'], ascending=True)

df_AS_2011=pd.DataFrame(df.loc[df['2011']== 'True'],columns=['location_name','val'])
df_AS_2011['val'] = df_AS_2011['val'].astype(int)
df_AS_2011 = df_AS_2011.sort_values(by=['location_name'], ascending=True)


df_AS_2012=pd.DataFrame(df.loc[df['2012']== 'True'],columns=['location_name','val'])
df_AS_2012['val'] = df_AS_2012['val'].astype(int)
df_AS_2012 = df_AS_2012.sort_values(by=['location_name'], ascending=True)

df_AS_2013=pd.DataFrame(df.loc[df['2013']== 'True'],columns=['location_name','val'])
df_AS_2013['val'] = df_AS_2013['val'].astype(int)
df_AS_2013 = df_AS_2013.sort_values(by=['location_name'], ascending=True)

df_AS_2014=pd.DataFrame(df.loc[df['2014']== 'True'],columns=['location_name','val'])
df_AS_2014['val'] = df_AS_2014['val'].astype(int)
df_AS_2014 = df_AS_2014.sort_values(by=['location_name'], ascending=True)

df_AS_2015=pd.DataFrame(df.loc[df['2015']== 'True'],columns=['location_name','val'])
df_AS_2015['val'] = df_AS_2015['val'].astype(int)
df_AS_2015 = df_AS_2015.sort_values(by=['location_name'], ascending=True)

df_AS_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_AS_in_list.append(np.array(df_AS_200" + str(i) + "['val']).tolist())")
    else:
        exec( "df_AS_in_list.append(np.array(df_AS_20" + str(i) + "['val']).tolist())")
print(size(df_AS_in_list))

#------------ Chronical Sarcoidosis ---------------
df_PS= pd.read_csv ('dataset/deaths_by_chronical_respiratory_desease/deaths_by_chronical_respiratory_desease_sarcoidosis/IHME-GBD_2019_DATA-39453181-1.csv',usecols = ['location_name','year','val']) 
df2_PS= df_PS[['location_name','year','val']]    # selects two of the columns in your file


df = pd.DataFrame(df2_PS,columns=['location_name','year','val'])
df['2000'] = df['year'].apply(lambda x: 'True' if x == 2000 else 'False')
df['2001'] = df['year'].apply(lambda x: 'True' if x == 2001 else 'False')
df['2002'] = df['year'].apply(lambda x: 'True' if x == 2002 else 'False')
df['2003'] = df['year'].apply(lambda x: 'True' if x == 2003 else 'False')
df['2004'] = df['year'].apply(lambda x: 'True' if x == 2004 else 'False')
df['2005'] = df['year'].apply(lambda x: 'True' if x == 2005 else 'False')
df['2006'] = df['year'].apply(lambda x: 'True' if x == 2006 else 'False')
df['2007'] = df['year'].apply(lambda x: 'True' if x == 2007 else 'False')
df['2008'] = df['year'].apply(lambda x: 'True' if x == 2008 else 'False')
df['2009'] = df['year'].apply(lambda x: 'True' if x == 2009 else 'False')
df['2010'] = df['year'].apply(lambda x: 'True' if x == 2010 else 'False')
df['2011'] = df['year'].apply(lambda x: 'True' if x == 2011 else 'False')
df['2012'] = df['year'].apply(lambda x: 'True' if x == 2012 else 'False')
df['2013'] = df['year'].apply(lambda x: 'True' if x == 2013 else 'False')
df['2014'] = df['year'].apply(lambda x: 'True' if x == 2014 else 'False')
df['2015'] = df['year'].apply(lambda x: 'True' if x == 2015 else 'False')



df_PS_2000=pd.DataFrame(df.loc[df['2000']== 'True'],columns=['location_name','val'])
df_PS_2000['val'] = df_PS_2000['val'].astype(int)
df_PS_2000 = df_PS_2000.sort_values(by=['location_name'], ascending=True)

df_PS_2001=pd.DataFrame(df.loc[df['2001']== 'True'],columns=['location_name','val'])
df_PS_2001['val'] = df_PS_2001['val'].astype(int)
df_PS_2001= df_PS_2001.sort_values(by=['location_name'], ascending=True)

df_PS_2002=pd.DataFrame(df.loc[df['2002']== 'True'],columns=['location_name','val'])
df_PS_2002['val'] = df_PS_2002['val'].astype(int)
df_PS_2002 = df_PS_2002.sort_values(by=['location_name'], ascending=True)

df_PS_2003=pd.DataFrame(df.loc[df['2003']== 'True'],columns=['location_name','val'])
df_PS_2003['val'] = df_PS_2003['val'].astype(int)
df_PS_2003 = df_PS_2003.sort_values(by=['location_name'], ascending=True)

df_PS_2004=pd.DataFrame(df.loc[df['2004']== 'True'],columns=['location_name','val'])
df_PS_2004['val'] = df_PS_2004['val'].astype(int)
df_PS_2004 = df_PS_2004.sort_values(by=['location_name'], ascending=True)


df_PS_2005=pd.DataFrame(df.loc[df['2005']== 'True'],columns=['location_name','val'])
df_PS_2005['val'] = df_PS_2005['val'].astype(int)
df_PS_2005 = df_PS_2005.sort_values(by=['location_name'], ascending=True)

df_PS_2006=pd.DataFrame(df.loc[df['2006']== 'True'],columns=['location_name','val'])
df_PS_2006['val'] = df_PS_2006['val'].astype(int)
df_PS_2006 = df_PS_2006.sort_values(by=['location_name'], ascending=True)

df_PS_2007=pd.DataFrame(df.loc[df['2007']== 'True'],columns=['location_name','val'])
df_PS_2007['val'] = df_PS_2007['val'].astype(int)
df_PS_2007 = df_PS_2007.sort_values(by=['location_name'], ascending=True)


df_PS_2008=pd.DataFrame(df.loc[df['2008']== 'True'],columns=['location_name','val'])
df_PS_2008['val'] = df_PS_2008['val'].astype(int)
df_PS_2008 = df_PS_2008.sort_values(by=['location_name'], ascending=True)

df_PS_2009=pd.DataFrame(df.loc[df['2009']== 'True'],columns=['location_name','val'])
df_PS_2009['val'] = df_PS_2009['val'].astype(int)
df_PS_2009 = df_PS_2009.sort_values(by=['location_name'], ascending=True)

df_PS_2010=pd.DataFrame(df.loc[df['2010']== 'True'],columns=['location_name','val'])
df_PS_2010['val'] = df_PS_2010['val'].astype(int)
df_PS_2010 = df_PS_2010.sort_values(by=['location_name'], ascending=True)

df_PS_2011=pd.DataFrame(df.loc[df['2011']== 'True'],columns=['location_name','val'])
df_PS_2011['val'] = df_PS_2011['val'].astype(int)
df_PS_2011 = df_PS_2011.sort_values(by=['location_name'], ascending=True)


df_PS_2012=pd.DataFrame(df.loc[df['2012']== 'True'],columns=['location_name','val'])
df_PS_2012['val'] = df_PS_2012['val'].astype(int)
df_PS_2012 = df_PS_2012.sort_values(by=['location_name'], ascending=True)

df_PS_2013=pd.DataFrame(df.loc[df['2013']== 'True'],columns=['location_name','val'])
df_PS_2013['val'] = df_PS_2013['val'].astype(int)
df_PS_2013 = df_PS_2013.sort_values(by=['location_name'], ascending=True)

df_PS_2014=pd.DataFrame(df.loc[df['2014']== 'True'],columns=['location_name','val'])
df_PS_2014['val'] = df_PS_2014['val'].astype(int)
df_PS_2014 = df_PS_2014.sort_values(by=['location_name'], ascending=True)

df_PS_2015=pd.DataFrame(df.loc[df['2015']== 'True'],columns=['location_name','val'])
df_PS_2015['val'] = df_PS_2015['val'].astype(int)
df_PS_2015 = df_PS_2015.sort_values(by=['location_name'], ascending=True)

df_PS_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_PS_in_list.append(np.array(df_PS_200" + str(i) + "['val']).tolist())")
    else:
        exec( "df_PS_in_list.append(np.array(df_PS_20" + str(i) + "['val']).tolist())")
print(size(df_PS_in_list))

#------------ Chronical Others ---------------
df_OCRD= pd.read_csv ('dataset/deaths_by_chronical_respiratory_desease/deaths_by_chronical_respiratory_desease_others/IHME-GBD_2019_DATA-d2c87871-1.csv',usecols = ['location_name','year','val']) 
df2_OCRD= df_OCRD[['location_name','year','val']]    # selects two of the columns in your file


df = pd.DataFrame(df2_OCRD,columns=['location_name','year','val'])
df['2000'] = df['year'].apply(lambda x: 'True' if x == 2000 else 'False')
df['2001'] = df['year'].apply(lambda x: 'True' if x == 2001 else 'False')
df['2002'] = df['year'].apply(lambda x: 'True' if x == 2002 else 'False')
df['2003'] = df['year'].apply(lambda x: 'True' if x == 2003 else 'False')
df['2004'] = df['year'].apply(lambda x: 'True' if x == 2004 else 'False')
df['2005'] = df['year'].apply(lambda x: 'True' if x == 2005 else 'False')
df['2006'] = df['year'].apply(lambda x: 'True' if x == 2006 else 'False')
df['2007'] = df['year'].apply(lambda x: 'True' if x == 2007 else 'False')
df['2008'] = df['year'].apply(lambda x: 'True' if x == 2008 else 'False')
df['2009'] = df['year'].apply(lambda x: 'True' if x == 2009 else 'False')
df['2010'] = df['year'].apply(lambda x: 'True' if x == 2010 else 'False')
df['2011'] = df['year'].apply(lambda x: 'True' if x == 2011 else 'False')
df['2012'] = df['year'].apply(lambda x: 'True' if x == 2012 else 'False')
df['2013'] = df['year'].apply(lambda x: 'True' if x == 2013 else 'False')
df['2014'] = df['year'].apply(lambda x: 'True' if x == 2014 else 'False')
df['2015'] = df['year'].apply(lambda x: 'True' if x == 2015 else 'False')



df_OCRD_2000=pd.DataFrame(df.loc[df['2000']== 'True'],columns=['location_name','val'])
df_OCRD_2000['val'] = df_OCRD_2000['val'].astype(int)
df_OCRD_2000 = df_OCRD_2000.sort_values(by=['location_name'], ascending=True)

df_OCRD_2001=pd.DataFrame(df.loc[df['2001']== 'True'],columns=['location_name','val'])
df_OCRD_2001['val'] = df_OCRD_2001['val'].astype(int)
df_OCRD_2001= df_OCRD_2001.sort_values(by=['location_name'], ascending=True)

df_OCRD_2002=pd.DataFrame(df.loc[df['2002']== 'True'],columns=['location_name','val'])
df_OCRD_2002['val'] = df_OCRD_2002['val'].astype(int)
df_OCRD_2002 = df_OCRD_2002.sort_values(by=['location_name'], ascending=True)

df_OCRD_2003=pd.DataFrame(df.loc[df['2003']== 'True'],columns=['location_name','val'])
df_OCRD_2003['val'] = df_OCRD_2003['val'].astype(int)
df_OCRD_2003 = df_OCRD_2003.sort_values(by=['location_name'], ascending=True)

df_OCRD_2004=pd.DataFrame(df.loc[df['2004']== 'True'],columns=['location_name','val'])
df_OCRD_2004['val'] = df_OCRD_2004['val'].astype(int)
df_OCRD_2004 = df_OCRD_2004.sort_values(by=['location_name'], ascending=True)


df_OCRD_2005=pd.DataFrame(df.loc[df['2005']== 'True'],columns=['location_name','val'])
df_OCRD_2005['val'] = df_OCRD_2005['val'].astype(int)
df_OCRD_2005 = df_OCRD_2005.sort_values(by=['location_name'], ascending=True)

df_OCRD_2006=pd.DataFrame(df.loc[df['2006']== 'True'],columns=['location_name','val'])
df_OCRD_2006['val'] = df_OCRD_2006['val'].astype(int)
df_OCRD_2006 = df_OCRD_2006.sort_values(by=['location_name'], ascending=True)

df_OCRD_2007=pd.DataFrame(df.loc[df['2007']== 'True'],columns=['location_name','val'])
df_OCRD_2007['val'] = df_OCRD_2007['val'].astype(int)
df_OCRD_2007 = df_OCRD_2007.sort_values(by=['location_name'], ascending=True)


df_OCRD_2008=pd.DataFrame(df.loc[df['2008']== 'True'],columns=['location_name','val'])
df_OCRD_2008['val'] = df_OCRD_2008['val'].astype(int)
df_OCRD_2008 = df_OCRD_2008.sort_values(by=['location_name'], ascending=True)

df_OCRD_2009=pd.DataFrame(df.loc[df['2009']== 'True'],columns=['location_name','val'])
df_OCRD_2009['val'] = df_OCRD_2009['val'].astype(int)
df_OCRD_2009 = df_OCRD_2009.sort_values(by=['location_name'], ascending=True)

df_OCRD_2010=pd.DataFrame(df.loc[df['2010']== 'True'],columns=['location_name','val'])
df_OCRD_2010['val'] = df_OCRD_2010['val'].astype(int)
df_OCRD_2010 = df_OCRD_2010.sort_values(by=['location_name'], ascending=True)

df_OCRD_2011=pd.DataFrame(df.loc[df['2011']== 'True'],columns=['location_name','val'])
df_OCRD_2011['val'] = df_OCRD_2011['val'].astype(int)
df_OCRD_2011 = df_OCRD_2011.sort_values(by=['location_name'], ascending=True)


df_OCRD_2012=pd.DataFrame(df.loc[df['2012']== 'True'],columns=['location_name','val'])
df_OCRD_2012['val'] = df_OCRD_2012['val'].astype(int)
df_OCRD_2012 = df_OCRD_2012.sort_values(by=['location_name'], ascending=True)

df_OCRD_2013=pd.DataFrame(df.loc[df['2013']== 'True'],columns=['location_name','val'])
df_OCRD_2013['val'] = df_OCRD_2013['val'].astype(int)
df_OCRD_2013 = df_OCRD_2013.sort_values(by=['location_name'], ascending=True)

df_OCRD_2014=pd.DataFrame(df.loc[df['2014']== 'True'],columns=['location_name','val'])
df_OCRD_2014['val'] = df_OCRD_2014['val'].astype(int)
df_OCRD_2014 = df_OCRD_2014.sort_values(by=['location_name'], ascending=True)

df_OCRD_2015=pd.DataFrame(df.loc[df['2015']== 'True'],columns=['location_name','val'])
df_OCRD_2015['val'] = df_OCRD_2015['val'].astype(int)
df_OCRD_2015 = df_OCRD_2015.sort_values(by=['location_name'], ascending=True)

df_OCRD_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_OCRD_in_list.append(np.array(df_OCRD_200" + str(i) + "['val']).tolist())")
    else:
        exec( "df_OCRD_in_list.append(np.array(df_OCRD_20" + str(i) + "['val']).tolist())")
print(size(df_OCRD_in_list))

#------------ Total Deaths ---------------
df_TD= pd.read_csv ('dataset/deaths_total/deaths-by-cause-category-stacked.csv',usecols = ['Entity','Year','Deaths - Injuries - Sex: Both - Age: All Ages (Number)','Deaths - Communicable, maternal, neonatal, and nutritional diseases - Sex: Both - Age: All Ages (Number)','Deaths - Non-communicable diseases - Sex: Both - Age: All Ages (Number)']) 
df2_TD= df_TD[['Entity','Year','Deaths - Injuries - Sex: Both - Age: All Ages (Number)','Deaths - Communicable, maternal, neonatal, and nutritional diseases - Sex: Both - Age: All Ages (Number)','Deaths - Non-communicable diseases - Sex: Both - Age: All Ages (Number)']]    # selects two of the columns in your file


df2_TD=df2_TD.rename(columns={'Entity': 'Country_Name',
                              'Deaths - Injuries - Sex: Both - Age: All Ages (Number)': 'Deaths_Inj',
                              'Deaths - Communicable, maternal, neonatal, and nutritional diseases - Sex: Both - Age: All Ages (Number)': 'Deaths_Com',
                              'Deaths - Non-communicable diseases - Sex: Both - Age: All Ages (Number)': 'Deaths_NonCom'})
sum_row = df2_TD.sum(axis=1)
df2_TD['Total Deaths'] = df2_TD['Deaths_Inj']+df2_TD['Deaths_Com']+df2_TD['Deaths_NonCom']




df = pd.DataFrame(df2_TD,columns=['Country_Name','Year','Deaths_Inj','Deaths_Com','Death_NonCom','Total Deaths'])
df['2000'] = df['Year'].apply(lambda x: 'True' if x == 2000 else 'False')
df['2001'] = df['Year'].apply(lambda x: 'True' if x == 2001 else 'False')
df['2002'] = df['Year'].apply(lambda x: 'True' if x == 2002 else 'False')
df['2003'] = df['Year'].apply(lambda x: 'True' if x == 2003 else 'False')
df['2004'] = df['Year'].apply(lambda x: 'True' if x == 2004 else 'False')
df['2005'] = df['Year'].apply(lambda x: 'True' if x == 2005 else 'False')
df['2006'] = df['Year'].apply(lambda x: 'True' if x == 2006 else 'False')
df['2007'] = df['Year'].apply(lambda x: 'True' if x == 2007 else 'False')
df['2008'] = df['Year'].apply(lambda x: 'True' if x == 2008 else 'False')
df['2009'] = df['Year'].apply(lambda x: 'True' if x == 2009 else 'False')
df['2010'] = df['Year'].apply(lambda x: 'True' if x == 2010 else 'False')
df['2011'] = df['Year'].apply(lambda x: 'True' if x == 2011 else 'False')
df['2012'] = df['Year'].apply(lambda x: 'True' if x == 2012 else 'False')
df['2013'] = df['Year'].apply(lambda x: 'True' if x == 2013 else 'False')
df['2014'] = df['Year'].apply(lambda x: 'True' if x == 2014 else 'False')
df['2015'] = df['Year'].apply(lambda x: 'True' if x == 2015 else 'False')



df_TD_2000=pd.DataFrame(df.loc[df['2000']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2000['Total Deaths'] = df_TD_2000['Total Deaths'].astype(int)
df_TD_2000 = df_TD_2000.sort_values(by=['Country_Name'], ascending=True)

df_TD_2001=pd.DataFrame(df.loc[df['2001']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2001['Total Deaths'] = df_TD_2001['Total Deaths'].astype(int)
df_TD_2001 = df_TD_2001.sort_values(by=['Country_Name'], ascending=True)

df_TD_2002=pd.DataFrame(df.loc[df['2002']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2002['Total Deaths'] = df_TD_2002['Total Deaths'].astype(int)
df_TD_2002 = df_TD_2002.sort_values(by=['Country_Name'], ascending=True)

df_TD_2003=pd.DataFrame(df.loc[df['2003']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2003['Total Deaths'] = df_TD_2003['Total Deaths'].astype(int)
df_TD_2003 = df_TD_2003.sort_values(by=['Country_Name'], ascending=True)

df_TD_2004=pd.DataFrame(df.loc[df['2004']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2004['Total Deaths'] = df_TD_2004['Total Deaths'].astype(int)
df_TD_2004 = df_TD_2004.sort_values(by=['Country_Name'], ascending=True)

df_TD_2005=pd.DataFrame(df.loc[df['2005']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2005['Total Deaths'] = df_TD_2005['Total Deaths'].astype(int)
df_TD_2005 = df_TD_2005.sort_values(by=['Country_Name'], ascending=True)

df_TD_2006=pd.DataFrame(df.loc[df['2006']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2006['Total Deaths'] = df_TD_2006['Total Deaths'].astype(int)
df_TD_2006 = df_TD_2006.sort_values(by=['Country_Name'], ascending=True)

df_TD_2007=pd.DataFrame(df.loc[df['2007']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2007['Total Deaths'] = df_TD_2007['Total Deaths'].astype(int)
df_TD_2007 = df_TD_2007.sort_values(by=['Country_Name'], ascending=True)

df_TD_2008=pd.DataFrame(df.loc[df['2008']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2008['Total Deaths'] = df_TD_2008['Total Deaths'].astype(int)
df_TD_2008 = df_TD_2008.sort_values(by=['Country_Name'], ascending=True)

df_TD_2009=pd.DataFrame(df.loc[df['2009']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2009['Total Deaths'] = df_TD_2009['Total Deaths'].astype(int)
df_TD_2009 = df_TD_2009.sort_values(by=['Country_Name'], ascending=True)

df_TD_2010=pd.DataFrame(df.loc[df['2010']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2010['Total Deaths'] = df_TD_2010['Total Deaths'].astype(int)
df_TD_2010 = df_TD_2010.sort_values(by=['Country_Name'], ascending=True)

df_TD_2011=pd.DataFrame(df.loc[df['2011']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2011['Total Deaths'] = df_TD_2011['Total Deaths'].astype(int)
df_TD_2011 = df_TD_2011.sort_values(by=['Country_Name'], ascending=True)

df_TD_2012=pd.DataFrame(df.loc[df['2012']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2012['Total Deaths'] = df_TD_2012['Total Deaths'].astype(int)
df_TD_2012 = df_TD_2012.sort_values(by=['Country_Name'], ascending=True)

df_TD_2013=pd.DataFrame(df.loc[df['2013']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2013['Total Deaths'] = df_TD_2013['Total Deaths'].astype(int)
df_TD_2013 = df_TD_2013.sort_values(by=['Country_Name'], ascending=True)

df_TD_2014=pd.DataFrame(df.loc[df['2014']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2014['Total Deaths'] = df_TD_2014['Total Deaths'].astype(int)
df_TD_2014 = df_TD_2014.sort_values(by=['Country_Name'], ascending=True)

df_TD_2015=pd.DataFrame(df.loc[df['2015']== 'True'],columns=['Country_Name','Total Deaths'])
df_TD_2015['Total Deaths'] = df_TD_2015['Total Deaths'].astype(int)
df_TD_2015 = df_TD_2015.sort_values(by=['Country_Name'], ascending=True)

import numpy as np

countryes=np.array(df_TD_2000['Country_Name'])#231 
countryes_More=np.array(df_AC_2000['location_name'])#204
#print(countryes_More)
arry=[]
for c in countryes:
  if c not in countryes_More:
    arry.append(c)
#print(len(np.array(arry)))




to_changeo= ["Bolivia","Cote d'Ivoire","Democratic Republic of Congo","Iran","Laos",
            "Micronesia (country)","Moldova","North Korea","South Korea","Russia","Syria",
            "Taiwan","Tanzania","Timor","Venezuela","Vietnam","Brunei","Cape Verde","United States"]		
#print(len(to_changeo))

only_deleteo=[]
for c in arry:
    if c not in to_changeo:
        only_deleteo.append(c)

#print(np.array(only_delete))
#print(np.array(only_deleteo))
#print(len(only_deleteo))
#devo fare la map di to_change--> new value



a_dict = {"Bolivia":"Bolivia (Plurinational State of)", 
          "Cote d'Ivoire":"Côte d'Ivoire",
          "Democratic Republic of Congo":"Democratic Republic of the Congo",
          "Iran":"Iran (Islamic Republic of)",
          "Laos":"Lao People's Democratic Republic",
          "Micronesia (country)":"Micronesia (Federated States of)",
          "Moldova":"Republic of Moldova",
          "North Korea":"Democratic People's Republic of Korea",
          "South Korea":"Republic of Korea",
          "Russia":"Russian Federation",
          "Syria":"Syrian Arab Republic",
          "Taiwan":"Taiwan (Province of China)",
          "Tanzania":"United Republic of Tanzania",
          "Timor":"Timor-Leste",
          "Venezuela":"Venezuela (Bolivarian Republic of)",
          "Vietnam": "Viet Nam",
          "Brunei":"Brunei Darussalam",
          "Cape Verde":"Cabo Verde",
          "United States": "United States of America"
          }


for key in a_dict:
  for i in range(0,16):
    if i < 10:
      exec('df_TD_200'+ str(i) +'.loc[df_TD_200'+ str(i) +'.Country_Name =="'+str(key)+'","Country_Name"]="'+str(a_dict[key])+'"')
    else:
      exec('df_TD_20'+ str(i) +'.loc[df_TD_20'+ str(i) +'.Country_Name =="'+str(key)+'","Country_Name"]="'+str(a_dict[key])+'"')

for c_to_delete in only_deleteo:
    for i in range(0,16):
            if i < 10:
                exec("df_TD_200"+ str(i) +"= df_TD_200"+ str(i) +".drop(df_TD_200"+ str(i) +"[df_TD_200"+ str(i) +".Country_Name == '"+ str(c_to_delete) +"'].index)")
            else:
                exec("df_TD_20"+ str(i) +"= df_TD_20"+ str(i) +".drop(df_TD_20"+ str(i) +"[df_TD_20"+ str(i) +".Country_Name == '"+ str(c_to_delete) +"'].index)")
#print(np.array(df_2001_Population))
#print(len(df_TD_2000))


x=np.array(df_TD_2000['Country_Name'])
y=np.array(df_TC_2000['location_name']) #204

lista=[]
for i in y:
  if i not in x:
    lista.append(i)



to_changeo= ["Bolivia","Cote d'Ivoire","Democratic Republic of Congo","Iran","Laos",
            "Micronesia (country)","Moldova","North Korea","South Korea","Russia","Syria",
            "Taiwan","Tanzania","Timor","Venezuela","Vietnam","Brunei","Cape Verde","United States"]		


add_nan=[]
for el in lista:
  if el not in to_changeo:
    add_nan.append(el)

#print(np.array(add_nan))


for el_toNan in add_nan:
  for i in range(0,16):
    if i < 10:
      exec("df_TD_200"+str(i) +"=df_TD_200"+ str(i) +".append({'Country_Name':'"+str(el_toNan)+"'},ignore_index=True)")
    else:
      exec("df_TD_20"+str(i) +"=df_TD_20"+ str(i) +".append({'Country_Name':'"+str(el_toNan)+"'},ignore_index=True)")

df_TD_2000 = df_TD_2000.sort_values(by=['Country_Name'], ascending=True)
df_TD_2001 = df_TD_2001.sort_values(by=['Country_Name'], ascending=True)
df_TD_2002 = df_TD_2002.sort_values(by=['Country_Name'], ascending=True)
df_TD_2003 = df_TD_2003.sort_values(by=['Country_Name'], ascending=True)
df_TD_2004 = df_TD_2004.sort_values(by=['Country_Name'], ascending=True)
df_TD_2005 = df_TD_2005.sort_values(by=['Country_Name'], ascending=True)
df_TD_2006 = df_TD_2006.sort_values(by=['Country_Name'], ascending=True)
df_TD_2007 = df_TD_2007.sort_values(by=['Country_Name'], ascending=True)
df_TD_2008 = df_TD_2008.sort_values(by=['Country_Name'], ascending=True)
df_TD_2009 = df_TD_2009.sort_values(by=['Country_Name'], ascending=True)
df_TD_2010 = df_TD_2010.sort_values(by=['Country_Name'], ascending=True)
df_TD_2011 = df_TD_2011.sort_values(by=['Country_Name'], ascending=True)
df_TD_2012 = df_TD_2012.sort_values(by=['Country_Name'], ascending=True)
df_TD_2013 = df_TD_2013.sort_values(by=['Country_Name'], ascending=True)
df_TD_2014 = df_TD_2014.sort_values(by=['Country_Name'], ascending=True)
df_TD_2015 = df_TD_2015.sort_values(by=['Country_Name'], ascending=True)







df_TD_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_TD_in_list.append(np.array(df_TD_200" + str(i) + "['Total Deaths']).tolist())")
    else:
        exec( "df_TD_in_list.append(np.array(df_TD_20" + str(i) + "['Total Deaths']).tolist())")
#print(size(df_TD_in_list))

#------------ Population ---------------
df_Population = pd.read_csv ('dataset/population/API_SP.POP.TOTL_DS2_en_csv_v2_1976634.csv',skiprows=4,usecols = ['Country Name','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015']) # Surface Area
df2_Population = df_Population[['Country Name','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015']] 

df_Population=df_Population.rename(columns={'Country Name': 'Country_Name'})


df_2000_Population = df_Population[['Country_Name','2000']].dropna()
df_2000_Population['2000'] = df_2000_Population['2000'].astype(int)
df_2000_Population = df_2000_Population.sort_values(by=['Country_Name'], ascending=True)

df_2001_Population = df_Population[['Country_Name','2001']].dropna()
df_2001_Population['2001'] = df_2001_Population['2001'].astype(int)
df_2001_Population = df_2001_Population.sort_values(by=['Country_Name'], ascending=True)

df_2002_Population = df_Population[['Country_Name','2002']].dropna()
df_2002_Population['2002'] = df_2002_Population['2002'].astype(int)
df_2002_Population = df_2002_Population.sort_values(by=['Country_Name'], ascending=True)

df_2003_Population = df_Population[['Country_Name','2003']].dropna()
df_2003_Population['2003'] = df_2003_Population['2003'].astype(int)
df_2003_Population = df_2003_Population.sort_values(by=['Country_Name'], ascending=True)

df_2004_Population = df_Population[['Country_Name','2004']].dropna()
df_2004_Population['2004'] = df_2004_Population['2004'].astype(int)
df_2004_Population = df_2004_Population.sort_values(by=['Country_Name'], ascending=True)

df_2005_Population = df_Population[['Country_Name','2005']].dropna()
df_2005_Population['2005'] = df_2005_Population['2005'].astype(int)
df_2005_Population = df_2005_Population.sort_values(by=['Country_Name'], ascending=True)

df_2006_Population = df_Population[['Country_Name','2006']].dropna()
df_2006_Population['2006'] = df_2006_Population['2006'].astype(int)
df_2006_Population = df_2006_Population.sort_values(by=['Country_Name'], ascending=True)

df_2007_Population = df_Population[['Country_Name','2007']].dropna()
df_2007_Population['2007'] = df_2007_Population['2007'].astype(int)
df_2007_Population = df_2007_Population.sort_values(by=['Country_Name'], ascending=True)

df_2008_Population = df_Population[['Country_Name','2008']].dropna()
df_2008_Population['2008'] = df_2008_Population['2008'].astype(int)
df_2008_Population = df_2008_Population.sort_values(by=['Country_Name'], ascending=True)

df_2009_Population = df_Population[['Country_Name','2009']].dropna()
df_2009_Population['2009'] = df_2009_Population['2009'].astype(int)
df_2009_Population = df_2009_Population.sort_values(by=['Country_Name'], ascending=True)

df_2010_Population = df_Population[['Country_Name','2010']].dropna()
df_2010_Population['2010'] = df_2010_Population['2010'].astype(int)
df_2010_Population = df_2010_Population.sort_values(by=['Country_Name'], ascending=True)

df_2011_Population = df_Population[['Country_Name','2011']].dropna()
df_2011_Population['2011'] = df_2011_Population['2011'].astype(int)
df_2011_Population = df_2011_Population.sort_values(by=['Country_Name'], ascending=True)

df_2012_Population = df_Population[['Country_Name','2012']].dropna()
df_2012_Population['2012'] = df_2012_Population['2012'].astype(int)
df_2012_Population = df_2012_Population.sort_values(by=['Country_Name'], ascending=True)

df_2013_Population = df_Population[['Country_Name','2013']].dropna()
df_2013_Population['2013'] = df_2013_Population['2013'].astype(int)
df_2013_Population = df_2013_Population.sort_values(by=['Country_Name'], ascending=True)

df_2014_Population = df_Population[['Country_Name','2014']].dropna()
df_2014_Population['2014'] = df_2014_Population['2014'].astype(int)
df_2014_Population = df_2014_Population.sort_values(by=['Country_Name'], ascending=True)

df_2015_Population = df_Population[['Country_Name','2015']].dropna()
df_2015_Population['2015'] = df_2015_Population['2015'].astype(int)
df_2015_Population = df_2015_Population.sort_values(by=['Country_Name'], ascending=True)



#We want to know the additional countries (even those with different names for the same country)
countryes=np.array(df_TC_2000['location_name'])
countryes_More=np.array(df_2000_Population['Country_Name'])
#print(countryes_More)
arr=[]
for c in countryes_More:
  if c not in countryes:
    arr.append(c)
#print(np.array(arr))

#after a manual checking we obtain the countries for which we need to change the labelling 
to_change= ["Bolivia","St. Lucia","St. Kitts and Nevis","Bahamas, The","Cote d'Ivoire","Congo, Rep.",
            "Congo, Dem. Rep.","Czech Republic","Micronesia, Fed. Sts.","Gambia, The","Egypt, Arab Rep.",
            "Iran, Islamic Rep.","Kyrgyz Republic","Korea, Rep.","Lao PDR", "Moldova",
            "Korea, Dem. People’s Rep.","Slovak Republic","Tanzania","United States",
            "St. Vincent and the Grenadines" ,"Venezuela, RB","Virgin Islands (U.S.)","Yemen, Rep.","Vietnam"]		

#intersect the two arrays to see which countries need to be eliminated
#print(len(to_change))
only_delete=[]
for c in arr:
    if c not in to_change:
        only_delete.append(c)

#print(np.array(only_delete))
#print(len(only_delete))

#mapping in Population, we need to change the different names for the same country
a_dict = {"Bolivia": "Bolivia (Plurinational State of)", 
          "St. Lucia": "Saint Lucia",
          "St. Kitts and Nevis":"Saint Kitts and Nevis",
          "Bahamas, The":"Bahamas",
          "Cote d'Ivoire":"Côte d'Ivoire",
          "Congo, Rep.": "Congo",
          "Congo, Dem. Rep.":"Democratic Republic of the Congo",
          "Czech Republic":"Czechia",
          "Micronesia, Fed. Sts.":"Micronesia (Federated States of)",
          "Gambia, The":"Gambia",
          "Egypt, Arab Rep.":"Egypt",
          "Iran, Islamic Rep.":"Iran (Islamic Republic of)",
          "Kyrgyz Republic":"Kyrgyzstan",
          "Korea, Rep.":"Republic of Korea",
          "Lao PDR":"Lao People's Democratic Republic",
          "Moldova":"Republic of Moldova",
          "Korea, Dem. People’s Rep.":"Democratic People's Republic of Korea",
          "Slovak Republic":"Slovakia",
          "Tanzania":"United Republic of Tanzania",
          "United States":"United States of America",
          "St. Vincent and the Grenadines":"Saint Vincent and the Grenadines",
          "Venezuela, RB":"Venezuela (Bolivarian Republic of)",
          "Virgin Islands (U.S.)":"United States Virgin Islands",
          "Yemen, Rep.":"Yemen",
          "Vietnam": "Viet Nam"
          }

for key in a_dict:
  for i in range(0,16):
    if i < 10:
      exec('df_200'+ str(i) +'_Population.loc[df_200'+ str(i) +'_Population.Country_Name =="'+str(key)+'","Country_Name"]="'+str(a_dict[key])+'"')
    else:
      exec('df_20'+ str(i) +'_Population.loc[df_20'+ str(i) +'_Population.Country_Name =="'+str(key)+'","Country_Name"]="'+str(a_dict[key])+'"')


#we delete the additional countries 
for c_to_delete in only_delete:
    for i in range(0,16):
            if i < 10:
                exec("df_200"+ str(i) +"_Population = df_200"+ str(i) +"_Population.drop(df_200"+ str(i) +"_Population[df_200"+ str(i) +"_Population.Country_Name == '"+ str(c_to_delete) +"'].index)")
            else:
                exec("df_20"+ str(i) +"_Population = df_20"+ str(i) +"_Population.drop(df_20"+ str(i) +"_Population[df_20"+ str(i) +"_Population.Country_Name == '" + str(c_to_delete) +"'].index)") 


#print(np.array(df_2001_Population))
#print(len(df_2015_Population))

#now we want to check if there is some country among the 204 which we have to insert for Population
x=np.array(df_2000_Population['Country_Name'])
y=np.array(df_TC_2000['location_name']) #204

list_to_nan=[]
for i in y:
  if i not in x:
    list_to_nan.append(i)
#print(list_to_nan)


for el_toNan in list_to_nan:
  for i in range(0,16):
    if i < 10:
      exec("df_200"+str(i) +"_Population =df_200"+ str(i) +"_Population.append({'Country_Name':'"+str(el_toNan)+"'},ignore_index=True)")
    else:
      exec("df_20"+str(i) +"_Population =df_20"+ str(i) +"_Population.append({'Country_Name':'"+str(el_toNan)+"'},ignore_index=True)")



#print(np.array(df_2000_Population))
for i in range(12,16):
    exec("df_20"+str(i) +"_Population =df_20"+ str(i) +"_Population.append({'Country_Name':'Eritrea'},ignore_index=True)")


#-----TAIWAN POPULATION- insert value because only the Attribute POPULATION is NAN 
df_Taiwan = pd.read_csv ('dataset/population/Taiwan Population/taiwan-population.csv') 
df2_Taiwan = df_Taiwan[['date',' Population']]    # selects two of the columns in your file

pop_Taiwan_forYears=np.array(df2_Taiwan[' Population']).tolist()

for i in range(0,16):
  if i<10:
    exec("df_200"+str(i) +"_Population.loc[(df_200"+ str(i) +"_Population['Country_Name']=='Taiwan (Province of China)','200"+str(i)+"')]="+str(pop_Taiwan_forYears[i]))
  else:
    exec("df_20"+str(i) +"_Population.loc[(df_20"+ str(i) +"_Population['Country_Name']=='Taiwan (Province of China)','20"+str(i)+"')]="+str(pop_Taiwan_forYears[i]))

#-----ERITREA POPULATION- insert value because only the Attribute POPULATION is NAN 
df_Eritrea= pd.read_csv ('dataset/population/Eritrea Population/eritrea-population-2021-02-15.csv') 
df2_Eritrea= df_Eritrea[['date',' Population']]    # selects two of the columns in your file

pop_Eritrea_forYears=np.array(df2_Eritrea[' Population']).tolist()

for i in range(0,16):
  if i<10:
    exec("df_200"+str(i) +"_Population.loc[(df_200"+ str(i) +"_Population['Country_Name']=='Eritrea','200"+str(i)+"')]="+str(pop_Eritrea_forYears[i]))
  else:
    exec("df_20"+str(i) +"_Population.loc[(df_20"+ str(i) +"_Population['Country_Name']=='Eritrea','20"+str(i)+"')]="+str(pop_Eritrea_forYears[i]))



df_2000_Population = df_2000_Population.sort_values(by=['Country_Name'], ascending=True)
df_2001_Population = df_2001_Population.sort_values(by=['Country_Name'], ascending=True)
df_2002_Population = df_2002_Population.sort_values(by=['Country_Name'], ascending=True)
df_2003_Population = df_2003_Population.sort_values(by=['Country_Name'], ascending=True)
df_2004_Population = df_2004_Population.sort_values(by=['Country_Name'], ascending=True)
df_2005_Population = df_2005_Population.sort_values(by=['Country_Name'], ascending=True)
df_2006_Population = df_2006_Population.sort_values(by=['Country_Name'], ascending=True)
df_2007_Population = df_2007_Population.sort_values(by=['Country_Name'], ascending=True)
df_2008_Population = df_2008_Population.sort_values(by=['Country_Name'], ascending=True)
df_2009_Population = df_2009_Population.sort_values(by=['Country_Name'], ascending=True)
df_2010_Population = df_2010_Population.sort_values(by=['Country_Name'], ascending=True)
df_2011_Population = df_2011_Population.sort_values(by=['Country_Name'], ascending=True)
df_2012_Population = df_2012_Population.sort_values(by=['Country_Name'], ascending=True)
df_2013_Population = df_2013_Population.sort_values(by=['Country_Name'], ascending=True)
df_2014_Population = df_2014_Population.sort_values(by=['Country_Name'], ascending=True)
df_2015_Population = df_2015_Population.sort_values(by=['Country_Name'], ascending=True)


df_population_in_list = []
for i in range(0,16):
    if i < 10:
        exec( "df_population_in_list.append(np.array(df_200" + str(i) + "_Population['200" + str(i) + "']).tolist())")
    else:
        exec( "df_population_in_list.append(np.array(df_20" + str(i) + "_Population['20" + str(i) + "']).tolist())")


print(size(df_population_in_list),"\n------------------------------------------")



#------------ Air Pollulant Gas Emissions ---------------
countryes=countryes.tolist()
count = 0
#------------ CO  ---------------
#xsl is a panda Dataframe
xls_co = pd.read_excel("dataset/air_pollulant_gas_emissions/v50_CO_1970_2015.xls", sheet_name='TOTALS BY COUNTRY', dtype={'strIPCC-Annex': str, 'World Region': str,	'ISO_A3': str,	'Name': str, '1970': float,	'1971': float,	'1972': float,	'1973': float,	'1974': float,	'1975': float,	'1976': float,	'1977': float,	'1978': float,	'1979': float,	'1980': float,	'1981': float,	'1982': float,	'1983': float,	'1984': float,	'1985': float,	'1986': float,	'1987': float,	'1988': float,	'1989': float,	'1990': float,	'1991': float,	'1992': float,	'1993': float,	'1994': float,	'1995': float,	'1996': float,	'1997': float, '1998': float,	'1999': float,	'2000': float,	'2001': float,	'2002': float,	'2003': float,	'2004': float,	'2005': float,	'2006': float,	'2007': float,	'2008': float,	'2009': float,	'2010': float,	'2011': float,	'2012': float,	'2013': float,	'2014': float,	'2015': float,})
xsl_co_resized = xls_co.take([3, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], axis=1) #without axes 1 the array refers to the rows

for index, row in xsl_co_resized.iterrows():
    if(math.isnan(row.iat[3])):
        count += 1

print(count, "COUNTRIES OF CO HAVE NULL VALUES !!!")
print(xsl_co_resized.shape)
count = 0
#print(xsl_co_resized.dtypes)
#print(xsl_co_resized)

#xsl_resized.to_csv('prova.csv', index=False) #write on a csv file without index

#------------ CH4  ---------------
#xsl is a panda Dataframe
xls_ch4 = pd.read_excel("dataset/air_pollulant_gas_emissions/v50_CH4_1970_2015.xls", sheet_name='TOTALS BY COUNTRY', dtype={'strIPCC-Annex': str, 'World Region': str,	'ISO_A3': str,	'Name': str, '1970': float,	'1971': float,	'1972': float,	'1973': float,	'1974': float,	'1975': float,	'1976': float,	'1977': float,	'1978': float,	'1979': float,	'1980': float,	'1981': float,	'1982': float,	'1983': float,	'1984': float,	'1985': float,	'1986': float,	'1987': float,	'1988': float,	'1989': float,	'1990': float,	'1991': float,	'1992': float,	'1993': float,	'1994': float,	'1995': float,	'1996': float,	'1997': float, '1998': float,	'1999': float,	'2000': float,	'2001': float,	'2002': float,	'2003': float,	'2004': float,	'2005': float,	'2006': float,	'2007': float,	'2008': float,	'2009': float,	'2010': float,	'2011': float,	'2012': float,	'2013': float,	'2014': float,	'2015': float,})
xsl_ch4_resized = xls_ch4.take([3, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], axis=1) #without axes 1 the array refers to the rows

for index, row in xsl_ch4_resized.iterrows():
    if(math.isnan(row.iat[3])):
        count += 1

print(count, "COUNTRIES OF CH4 HAVE NULL VALUES !!!")
print(xsl_ch4_resized.shape)
count = 0

#print(xsl_ch4_resized)

#------------ NH3  ---------------
#xsl is a panda Dataframe
xls_nh3 = pd.read_excel("dataset/air_pollulant_gas_emissions/v50_NH3_1970_2015.xls", sheet_name='TOTALS BY COUNTRY', dtype={'strIPCC-Annex': str, 'World Region': str,	'ISO_A3': str,	'Name': str, '1970': float,	'1971': float,	'1972': float,	'1973': float,	'1974': float,	'1975': float,	'1976': float,	'1977': float,	'1978': float,	'1979': float,	'1980': float,	'1981': float,	'1982': float,	'1983': float,	'1984': float,	'1985': float,	'1986': float,	'1987': float,	'1988': float,	'1989': float,	'1990': float,	'1991': float,	'1992': float,	'1993': float,	'1994': float,	'1995': float,	'1996': float,	'1997': float, '1998': float,	'1999': float,	'2000': float,	'2001': float,	'2002': float,	'2003': float,	'2004': float,	'2005': float,	'2006': float,	'2007': float,	'2008': float,	'2009': float,	'2010': float,	'2011': float,	'2012': float,	'2013': float,	'2014': float,	'2015': float,})
xsl_nh3_resized = xls_nh3.take([3, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], axis=1) #without axes 1 the array refers to the rows

for index, row in xsl_nh3_resized.iterrows():
    if(math.isnan(row.iat[3])):
        count += 1

print(count, "COUNTRIES OF NH3 HAVE NULL VALUES !!!")
print(xsl_nh3_resized.shape)
count = 0

#print(xsl_nh3_resized)

#------------ NMVOC  ---------------
#xsl is a panda Dataframe
xls_nmvoc = pd.read_excel("dataset/air_pollulant_gas_emissions/v50_NMVOC_1970_2015.xls", sheet_name='TOTALS BY COUNTRY', dtype={'strIPCC-Annex': str, 'World Region': str,	'ISO_A3': str,	'Name': str, '1970': float,	'1971': float,	'1972': float,	'1973': float,	'1974': float,	'1975': float,	'1976': float,	'1977': float,	'1978': float,	'1979': float,	'1980': float,	'1981': float,	'1982': float,	'1983': float,	'1984': float,	'1985': float,	'1986': float,	'1987': float,	'1988': float,	'1989': float,	'1990': float,	'1991': float,	'1992': float,	'1993': float,	'1994': float,	'1995': float,	'1996': float,	'1997': float, '1998': float,	'1999': float,	'2000': float,	'2001': float,	'2002': float,	'2003': float,	'2004': float,	'2005': float,	'2006': float,	'2007': float,	'2008': float,	'2009': float,	'2010': float,	'2011': float,	'2012': float,	'2013': float,	'2014': float,	'2015': float,})
xsl_nmvoc_resized = xls_nmvoc.take([3, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], axis=1) #without axes 1 the array refers to the rows

for index, row in xsl_nmvoc_resized.iterrows():
    if(math.isnan(row.iat[3])):
        count += 1

print(count, "COUNTRIES OF NMVOC HAVE NULL VALUES !!!")
print(xsl_nmvoc_resized.shape)
count = 0

#print(xsl_nmvoc_resized)

#------------ NOx  ---------------
#xsl is a panda Dataframe
xls_nox = pd.read_excel("dataset/air_pollulant_gas_emissions/v50_NOx_1970_2015.xls", sheet_name='TOTALS BY COUNTRY', dtype={'strIPCC-Annex': str, 'World Region': str,	'ISO_A3': str,	'Name': str, '1970': float,	'1971': float,	'1972': float,	'1973': float,	'1974': float,	'1975': float,	'1976': float,	'1977': float,	'1978': float,	'1979': float,	'1980': float,	'1981': float,	'1982': float,	'1983': float,	'1984': float,	'1985': float,	'1986': float,	'1987': float,	'1988': float,	'1989': float,	'1990': float,	'1991': float,	'1992': float,	'1993': float,	'1994': float,	'1995': float,	'1996': float,	'1997': float, '1998': float,	'1999': float,	'2000': float,	'2001': float,	'2002': float,	'2003': float,	'2004': float,	'2005': float,	'2006': float,	'2007': float,	'2008': float,	'2009': float,	'2010': float,	'2011': float,	'2012': float,	'2013': float,	'2014': float,	'2015': float,})
xsl_nox_resized = xls_nox.take([3, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], axis=1) #without axes 1 the array refers to the rows

for index, row in xsl_nox_resized.iterrows():
    if(math.isnan(row.iat[3])):
        count += 1

print(count, "COUNTRIES OF NOx HAVE NULL VALUES !!!")
print(xsl_nox_resized.shape)
count = 0

#print(xsl_nox_resized)

#------------ SO2  ---------------
#xsl is a panda Dataframe
xls_so2 = pd.read_excel("dataset/air_pollulant_gas_emissions/v50_SO2_1970_2015.xls", sheet_name='TOTALS BY COUNTRY', dtype={'strIPCC-Annex': str, 'World Region': str,	'ISO_A3': str,	'Name': str, '1970': float,	'1971': float,	'1972': float,	'1973': float,	'1974': float,	'1975': float,	'1976': float,	'1977': float,	'1978': float,	'1979': float,	'1980': float,	'1981': float,	'1982': float,	'1983': float,	'1984': float,	'1985': float,	'1986': float,	'1987': float,	'1988': float,	'1989': float,	'1990': float,	'1991': float,	'1992': float,	'1993': float,	'1994': float,	'1995': float,	'1996': float,	'1997': float, '1998': float,	'1999': float,	'2000': float,	'2001': float,	'2002': float,	'2003': float,	'2004': float,	'2005': float,	'2006': float,	'2007': float,	'2008': float,	'2009': float,	'2010': float,	'2011': float,	'2012': float,	'2013': float,	'2014': float,	'2015': float,})
xsl_so2_resized = xls_so2.take([3, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], axis=1) #without axes 1 the array refers to the rows

for index, row in xsl_so2_resized.iterrows():
    if(math.isnan(row.iat[3])):
        count += 1

print(count, "COUNTRIES OF SO2 HAVE NULL VALUES !!!")
print(xsl_so2_resized.shape)
count = 0

#print(xsl_so2_resized)


#------------ Fine Particulate Matter Emissions ---------------

#------------ PM10  ---------------
xls_pm10 = pd.read_excel("dataset/fine_particulate_matter_emissions/v50_PM10_1970_2015.xls", sheet_name='TOTALS BY COUNTRY', dtype={'strIPCC-Annex': str, 'World Region': str,	'ISO_A3': str,	'Name': str, '1970': float,	'1971': float,	'1972': float,	'1973': float,	'1974': float,	'1975': float,	'1976': float,	'1977': float,	'1978': float,	'1979': float,	'1980': float,	'1981': float,	'1982': float,	'1983': float,	'1984': float,	'1985': float,	'1986': float,	'1987': float,	'1988': float,	'1989': float,	'1990': float,	'1991': float,	'1992': float,	'1993': float,	'1994': float,	'1995': float,	'1996': float,	'1997': float, '1998': float,	'1999': float,	'2000': float,	'2001': float,	'2002': float,	'2003': float,	'2004': float,	'2005': float,	'2006': float,	'2007': float,	'2008': float,	'2009': float,	'2010': float,	'2011': float,	'2012': float,	'2013': float,	'2014': float,	'2015': float,})
xsl_pm10_resized = xls_pm10.take([3, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], axis=1) #without axes 1 the array refers to the rows

for index, row in xsl_pm10_resized.iterrows():
    if(math.isnan(row.iat[3])):
        count += 1

print(count, "COUNTRIES OF PM10 HAVE NULL VALUES !!!")
print(xsl_pm10_resized.shape)
count = 0

#print(xsl_pm10_resized)

#------------ PM25  ---------------
xls_pm25 = pd.read_excel("dataset/fine_particulate_matter_emissions/v50_PM2.5_1970_2015.xls", sheet_name='TOTALS BY COUNTRY', dtype={'strIPCC-Annex': str, 'World Region': str,	'ISO_A3': str,	'Name': str, '1970': float,	'1971': float,	'1972': float,	'1973': float,	'1974': float,	'1975': float,	'1976': float,	'1977': float,	'1978': float,	'1979': float,	'1980': float,	'1981': float,	'1982': float,	'1983': float,	'1984': float,	'1985': float,	'1986': float,	'1987': float,	'1988': float,	'1989': float,	'1990': float,	'1991': float,	'1992': float,	'1993': float,	'1994': float,	'1995': float,	'1996': float,	'1997': float, '1998': float,	'1999': float,	'2000': float,	'2001': float,	'2002': float,	'2003': float,	'2004': float,	'2005': float,	'2006': float,	'2007': float,	'2008': float,	'2009': float,	'2010': float,	'2011': float,	'2012': float,	'2013': float,	'2014': float,	'2015': float,})
xsl_pm25_resized = xls_pm25.take([3, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], axis=1) #without axes 1 the array refers to the rows

for index, row in xsl_pm25_resized.iterrows():
    if(math.isnan(row.iat[3])):
        count += 1

print(count, "COUNTRIES OF PM2.5 HAVE NULL VALUES !!!")
print(xsl_pm25_resized.shape,"\n------------------------------------------")
count = 0

#print(xsl_pm25_resized)

#----------------------------------------------------- Merge Tables and Write CSV -----------------------------------------------------

#list with 16 lists with all values for each year
co_years_separate = []
pm_10_years_separate = []
pm_25_years_separate = []
ch4_years_separate = []
nh3_years_separate = []
nmvoc_years_separate = []
nox_years_separate = []
so2_years_separate = []

for i in range(0, 16):
    co_years_separate.append([])
    pm_10_years_separate.append([])
    pm_25_years_separate.append([])
    ch4_years_separate.append([])
    nh3_years_separate.append([])
    nmvoc_years_separate.append([])
    nox_years_separate.append([])
    so2_years_separate.append([])


#Initialize all the lists witj listst of None with sixe of the number of countries

for j in range(0, 16):
    for i in range (0, size(countryes)):
        co_years_separate[j].append(math.nan)
        pm_10_years_separate[j].append(math.nan)
        pm_25_years_separate[j].append(math.nan)
        ch4_years_separate[j].append(math.nan)
        nh3_years_separate[j].append(math.nan)
        nmvoc_years_separate[j].append(math.nan)
        nox_years_separate[j].append(math.nan)
        so2_years_separate[j].append(math.nan)

'''for j in range(0, 16):
    for i in range (0, size(countryes)):
        co_years_separate[j].append(999999999999)
        pm_10_years_separate[j].append(999999999999)
        pm_25_years_separate[j].append(999999999999)
        ch4_years_separate[j].append(999999999999)
        nh3_years_separate[j].append(999999999999)
        nmvoc_years_separate[j].append(999999999999)
        nox_years_separate[j].append(999999999999)
        so2_years_separate[j].append(999999999999)'''




list_buffer = []
list_buffer_1 = []
#list1 has the naming used in countries, list2 has the naming used in x 
co_merge_association = [["Andorra", "Bolivia (Plurinational State of)", "Cabo Verde", "Czechia", "Côte d'Ivoire", "Democratic People's Republic of Korea", "Democratic Republic of the Congo", "Eswatini", "Iran (Islamic Republic of)", "Libya", "Marshall Islands", "Micronesia (Federated States of)", "Monaco", "Montenegro", "Nauru", "North Macedonia", "Northern Mariana Islands", "Palestine", "Republic of Korea", "Republic of Moldova", "San Marino", "Serbia", "South Sudan", "Taiwan (Province of China)", "Tuvalu", "United Republic of Tanzania", "United States Virgin Islands", "United States of America", "Venezuela (Bolivarian Republic of)"],
                        ["", "Bolivia", "Cape Verde", "Czech Republic", "Cote d'Ivoire", "Korea, Democratic People's Republic of", "Congo_the Democratic Republic of the", "Swaziland", "Iran, Islamic Republic of", "Libyan Arab Jamahiriya", "", "Micronesia, Federated States of", "", "", "", "Macedonia, the former Yugoslav Republic of", "", "", "Korea, Republic of", "Moldova, Republic of", "", "Serbia and Montenegro", "", "Taiwan_Province of China", "", "Tanzania_United Republic of", "Virgin Islands_USA", "United States", "Venezuela"]]
                        
#Take all the countries from the file with the minumin number of them (CO)
for index, row in xsl_co_resized.iterrows():
    if(row.iat[0] in countryes):
        for i in range(0, 16):
            co_years_separate[i][countryes.index(row.iat[0])] = row.iat[i+1]
        #list_buffer.append(row.iat[0])
    elif(row.iat[0] in co_merge_association[1]):
        for i in range(0, 16):
            index_in_map_list_x = co_merge_association[1].index(row.iat[0])
            index_in_map_list_countries = countryes.index(co_merge_association[0][index_in_map_list_x])
            co_years_separate[i][index_in_map_list_countries] = row.iat[i+1]
'''    else:
        #print(index, row.iat[0])
        list_buffer_1.append(row.iat[0])

    print("IN COUNTRIES BUT NOT IN X:\n")
    counters = 0
    for i in countryes:
        if i not in list_buffer:
            counters += 1
            print(counters, i)

    print('--------------------------------------------')
    print("IN X BUT NOT IN COUNTRIES:\n")

    counters = 0
    for i in sorted(list_buffer_1):
        counters += 1
        print(counters, i)


    print('--------------------------------------------')
    print("IN COUNTRIES BUT NOT IN MAP:\n")
    for j in range(0, len(co_merge_association[0])):
        if co_merge_association[1][j] == "":
            print(co_merge_association[0][j])

    print('--------------------------------------------')
    print("IN X BUT NOT IN MAP:\n")
    for j in list_buffer_1:
        print(j)
    list_buffer = []
    list_buffer_1 = []'''

#Fill all the lists, each list will have one list per year
for index, row in xsl_pm10_resized.iterrows():
    if(row.iat[0] in countryes):
        for i in range(0, 16):
            pm_10_years_separate[i][countryes.index(row.iat[0])] = row.iat[i+1]
    elif(row.iat[0] in co_merge_association[1]):
        for i in range(0, 16):
            index_in_map_list_x = co_merge_association[1].index(row.iat[0])
            index_in_map_list_countries = countryes.index(co_merge_association[0][index_in_map_list_x])
            pm_10_years_separate[i][index_in_map_list_countries] = row.iat[i+1]

for index, row in xsl_pm25_resized.iterrows():
    if(row.iat[0] in countryes):
        for i in range(0, 16):
            pm_25_years_separate[i][countryes.index(row.iat[0])] = row.iat[i+1]
    elif(row.iat[0] in co_merge_association[1]):
        for i in range(0, 16):
            index_in_map_list_x = co_merge_association[1].index(row.iat[0])
            index_in_map_list_countries = countryes.index(co_merge_association[0][index_in_map_list_x])
            pm_25_years_separate[i][index_in_map_list_countries] = row.iat[i+1]
            
for index, row in xsl_ch4_resized.iterrows():
    if(row.iat[0] in countryes):
        for i in range(0, 16):
            ch4_years_separate[i][countryes.index(row.iat[0])] = row.iat[i+1]
    elif(row.iat[0] in co_merge_association[1]):
        for i in range(0, 16):
            index_in_map_list_x = co_merge_association[1].index(row.iat[0])
            index_in_map_list_countries = countryes.index(co_merge_association[0][index_in_map_list_x])
            ch4_years_separate[i][index_in_map_list_countries] = row.iat[i+1]
            
for index, row in xsl_nh3_resized.iterrows():
    if(row.iat[0] in countryes):
        for i in range(0, 16):
            nh3_years_separate[i][countryes.index(row.iat[0])] = row.iat[i+1]
    elif(row.iat[0] in co_merge_association[1]):
        for i in range(0, 16):
            index_in_map_list_x = co_merge_association[1].index(row.iat[0])
            index_in_map_list_countries = countryes.index(co_merge_association[0][index_in_map_list_x])
            nh3_years_separate[i][index_in_map_list_countries] = row.iat[i+1]
            
for index, row in xsl_nmvoc_resized.iterrows():
    if(row.iat[0] in countryes):
        for i in range(0, 16):
            nmvoc_years_separate[i][countryes.index(row.iat[0])] = row.iat[i+1]
    elif(row.iat[0] in co_merge_association[1]):
        for i in range(0, 16):
            index_in_map_list_x = co_merge_association[1].index(row.iat[0])
            index_in_map_list_countries = countryes.index(co_merge_association[0][index_in_map_list_x])
            nmvoc_years_separate[i][index_in_map_list_countries] = row.iat[i+1]
            
for index, row in xsl_nox_resized.iterrows():
    if(row.iat[0] in countryes):
        for i in range(0, 16):
            nox_years_separate[i][countryes.index(row.iat[0])] = row.iat[i+1]
    elif(row.iat[0] in co_merge_association[1]):
        for i in range(0, 16):
            index_in_map_list_x = co_merge_association[1].index(row.iat[0])
            index_in_map_list_countries = countryes.index(co_merge_association[0][index_in_map_list_x])
            nox_years_separate[i][index_in_map_list_countries] = row.iat[i+1]
            
for index, row in xsl_so2_resized.iterrows():
    if(row.iat[0] in countryes):
        for i in range(0, 16):
            so2_years_separate[i][countryes.index(row.iat[0])] = row.iat[i+1]
    elif(row.iat[0] in co_merge_association[1]):
        for i in range(0, 16):
            index_in_map_list_x = co_merge_association[1].index(row.iat[0])
            index_in_map_list_countries = countryes.index(co_merge_association[0][index_in_map_list_x])
            so2_years_separate[i][index_in_map_list_countries] = row.iat[i+1]

print('CO')
list_buffer_print = []
for listElem in co_years_separate: list_buffer_print.append(size(listElem))
print(list_buffer_print)
print((sum(~np.isnan(np.transpose(np.array(co_years_separate))))).tolist())
print('PM10')
list_buffer_print = []
for listElem in pm_10_years_separate: list_buffer_print.append(size(listElem))
print(list_buffer_print)
print((sum(~np.isnan(np.transpose(np.array(pm_10_years_separate))))).tolist())
print('PM25')
list_buffer_print = []
for listElem in pm_25_years_separate: list_buffer_print.append(size(listElem))
print(list_buffer_print)
print((sum(~np.isnan(np.transpose(np.array(pm_25_years_separate))))).tolist())
print('CH4')
list_buffer_print = []
for listElem in ch4_years_separate: list_buffer_print.append(size(listElem))
print(list_buffer_print)
print((sum(~np.isnan(np.transpose(np.array(ch4_years_separate))))).tolist())
print('NH3')
list_buffer_print = []
for listElem in nh3_years_separate: list_buffer_print.append(size(listElem))
print(list_buffer_print)
print((sum(~np.isnan(np.transpose(np.array(nh3_years_separate))))).tolist())
print('NMVOC')
list_buffer_print = []
for listElem in nmvoc_years_separate: list_buffer_print.append(size(listElem))
print(list_buffer_print)
print((sum(~np.isnan(np.transpose(np.array(nmvoc_years_separate))))).tolist())
print('NOX')
list_buffer_print = []
for listElem in nox_years_separate: list_buffer_print.append(size(listElem))
print(list_buffer_print)
print((sum(~np.isnan(np.transpose(np.array(nox_years_separate))))).tolist())
print('SO2')
list_buffer_print = []
for listElem in so2_years_separate: list_buffer_print.append(size(listElem))
print(list_buffer_print)
print((sum(~np.isnan(np.transpose(np.array(so2_years_separate))))).tolist())
print('--------------------------------------------')

#----------------------------------------------------- Delete rows with empty fields -----------------------------------------------------

list_index_to_delete = []
list_to_remove=['Andorra','Cook Islands','Marshall Islands','Monaco','Montenegro','Nauru','Niue','Northern Mariana Islands','Palau','Palestine','Saint Kitts and Nevis','San Marino','South Sudan','Tokelau','Tuvalu','United States Virgin Islands']
for d in list_to_remove:
    list_index_to_delete.append(countryes.index(d))

starting_number_of_countries = len(countryes)
final_number_of_countries = len(countryes)-len(list_to_remove)

for j in list_index_to_delete:
    countryes[j] = "delete"
    for c in range(0,16):
        co_years_separate[c][j] = 1234567891011
        ch4_years_separate[c][j] = 1234567891011
        nh3_years_separate[c][j] = 1234567891011
        nmvoc_years_separate[c][j] = 1234567891011
        nox_years_separate[c][j] = 1234567891011
        so2_years_separate[c][j] = 1234567891011
        pm_10_years_separate[c][j] = 1234567891011
        pm_25_years_separate[c][j] = 1234567891011
        df_TC_in_list[c][j] = 1234567891011
        df_AC_in_list[c][j] = 1234567891011
        df_CRD_in_list[c][j] = 1234567891011
        df_PNE_in_list[c][j] = 1234567891011
        df_AS_in_list[c][j] = 1234567891011
        df_PS_in_list[c][j] = 1234567891011
        df_OCRD_in_list[c][j] = 1234567891011
        df_TD_in_list[c][j] = 1234567891011
        df_population_in_list[c][j] = 1234567891011

big_buffer = []
big_buffer.append([])
for i in range(1, 18):
    big_buffer.append([])
    for j in range(0, 16):
        big_buffer[i].append([])

for j in range(0, starting_number_of_countries):
        if(not countryes[j] == "delete"):
            big_buffer[0].append(countryes[j])

for i in range(0, 16):
    for j in range(0, starting_number_of_countries):
        if(not co_years_separate[i][j] == 1234567891011):
            big_buffer[1][i].append(co_years_separate[i][j])
        if(not ch4_years_separate[i][j] == 1234567891011):
            big_buffer[2][i].append(ch4_years_separate[i][j])
        if(not nh3_years_separate[i][j] == 1234567891011):
            big_buffer[3][i].append(nh3_years_separate[i][j])
        if(not nmvoc_years_separate[i][j] == 1234567891011):
            big_buffer[4][i].append(nmvoc_years_separate[i][j])
        if(not nox_years_separate[i][j] == 1234567891011):
            big_buffer[5][i].append(nox_years_separate[i][j])
        if(not so2_years_separate[i][j] == 1234567891011):
            big_buffer[6][i].append(so2_years_separate[i][j])
        if(not pm_10_years_separate[i][j] == 1234567891011):
            big_buffer[7][i].append(pm_10_years_separate[i][j])
        if(not pm_25_years_separate[i][j] == 1234567891011):
            big_buffer[8][i].append(pm_25_years_separate[i][j])
        if(not df_TC_in_list[i][j] == 1234567891011):
            big_buffer[9][i].append(df_TC_in_list[i][j])
        if(not df_AC_in_list[i][j] == 1234567891011):
            big_buffer[10][i].append(df_AC_in_list[i][j])
        if(not df_CRD_in_list[i][j] == 1234567891011):
            big_buffer[11][i].append(df_CRD_in_list[i][j])
        if(not df_PNE_in_list[i][j] == 1234567891011):
            big_buffer[12][i].append(df_PNE_in_list[i][j])
        if(not df_AS_in_list[i][j] == 1234567891011):
            big_buffer[13][i].append(df_AS_in_list[i][j])
        if(not df_PS_in_list[i][j] == 1234567891011):
            big_buffer[14][i].append(df_PS_in_list[i][j])
        if(not df_OCRD_in_list[i][j] == 1234567891011):
            big_buffer[15][i].append(df_OCRD_in_list[i][j])
        if(not df_TD_in_list[i][j] == 1234567891011):
            big_buffer[16][i].append(df_TD_in_list[i][j])
        if(not df_population_in_list[i][j] == 1234567891011):
            #print(df_population_in_list[i][j], i, j)
            big_buffer[17][i].append(df_population_in_list[i][j])


countryes.clear()
for j in range(0, final_number_of_countries):
    countryes.append(big_buffer[0][j])

co_years_separate.clear()
ch4_years_separate.clear()
nh3_years_separate.clear()
nmvoc_years_separate.clear()
nox_years_separate.clear()
so2_years_separate.clear()
pm_10_years_separate.clear()
pm_25_years_separate.clear()
df_TC_in_list.clear()
df_AC_in_list.clear()
df_CRD_in_list.clear()
df_PNE_in_list.clear()
df_AS_in_list.clear()
df_PS_in_list.clear()
df_OCRD_in_list.clear()
df_TD_in_list.clear()
df_population_in_list.clear()

for i in range(0, 16):
        co_years_separate.append(big_buffer[1][i])
        ch4_years_separate.append(big_buffer[2][i])
        nh3_years_separate.append(big_buffer[3][i])
        nmvoc_years_separate.append(big_buffer[4][i])
        nox_years_separate.append(big_buffer[5][i])
        so2_years_separate.append(big_buffer[6][i])
        pm_10_years_separate.append(big_buffer[7][i])
        pm_25_years_separate.append(big_buffer[8][i])
        df_TC_in_list.append(big_buffer[9][i])
        df_AC_in_list.append(big_buffer[10][i])
        df_CRD_in_list.append(big_buffer[11][i])
        df_PNE_in_list.append(big_buffer[12][i])
        df_AS_in_list.append(big_buffer[13][i])
        df_PS_in_list.append(big_buffer[14][i])
        df_OCRD_in_list.append(big_buffer[15][i])
        df_TD_in_list.append(big_buffer[16][i])
        df_population_in_list.append(big_buffer[17][i])
        

#Make the full tables of DataFrames
table2000 = None
table2001 = None
table2002 = None
table2003 = None
table2004 = None
table2005 = None
table2006 = None
table2007 = None
table2008 = None
table2009 = None
table2010 = None
table2011 = None
table2012 = None
table2013 = None
table2014 = None
table2015 = None

for i in range(0, 16):
    if i < 10:
        exec("table200" + str(i) + " = pd.DataFrame(data={'Country': countryes, 'CO': co_years_separate[" + str(i) + "], 'CH4': ch4_years_separate[" + str(i) + "], 'NH3': nh3_years_separate[" + str(i) + "], 'NMVOC': nmvoc_years_separate[" + str(i) + "], 'NOx' : nox_years_separate[" + str(i) + "], 'SO2' : so2_years_separate[" + str(i) + "],'PM 10': pm_10_years_separate[" + str(i) + "], 'PM 2.5' : pm_25_years_separate[" + str(i) + "], 'Total Cancer' : df_TC_in_list[" + str(i) + "], 'Air Cancer' : df_AC_in_list[" + str(i) + "], 'Chronic Respiratory Diseases' : df_CRD_in_list[" + str(i) + "], 'Pneumoconiosis' : df_PNE_in_list[" + str(i) + "], 'Asthma' : df_AS_in_list[" + str(i) + "], 'Interstitial Lung Disease and Pulmonary Sarcoidosis' : df_PS_in_list[" + str(i) + "], 'Other Chronic Respiratory Diseases' : df_OCRD_in_list[" + str(i) + "], 'Total Deaths' : df_TD_in_list[" + str(i) + "], 'Total Population' : df_population_in_list[" + str(i) + "]})")
    else:
        exec("table20" + str(i) + " = pd.DataFrame(data={'Country': countryes, 'CO': co_years_separate[" + str(i) + "], 'CH4': ch4_years_separate[" + str(i) + "], 'NH3': nh3_years_separate[" + str(i) + "], 'NMVOC': nmvoc_years_separate[" + str(i) + "], 'NOx' : nox_years_separate[" + str(i) + "], 'SO2' : so2_years_separate[" + str(i) + "],'PM 10': pm_10_years_separate[" + str(i) + "], 'PM 2.5' : pm_25_years_separate[" + str(i) + "], 'Total Cancer' : df_TC_in_list[" + str(i) + "], 'Air Cancer' : df_AC_in_list[" + str(i) + "], 'Chronic Respiratory Diseases' : df_CRD_in_list[" + str(i) + "], 'Pneumoconiosis' : df_PNE_in_list[" + str(i) + "], 'Asthma' : df_AS_in_list[" + str(i) + "], 'Interstitial Lung Disease and Pulmonary Sarcoidosis' : df_PS_in_list[" + str(i) + "], 'Other Chronic Respiratory Diseases' : df_OCRD_in_list[" + str(i) + "], 'Total Deaths' : df_TD_in_list[" + str(i) + "], 'Total Population' : df_population_in_list[" + str(i) + "]})")



#----------------------------------------------------- Compute the PCA -----------------------------------------------------

#pca_attributes=['CO','CH4','NH3','NMVOC','NOx','SO2','PM 10','PM 2.5','Total Cancer','Air Cancer','Chronic Respiratory Diseases','Pneumoconiosis','Asthma','Interstitial Lung Disease and Pulmonary Sarcoidosis','Other Chronic Respiratory Diseases','Total Deaths','Total Population']
pca_attributes=['CO','CH4','NH3','NMVOC','NOx','SO2','PM 10','PM 2.5','Air Cancer','Chronic Respiratory Diseases','Pneumoconiosis','Asthma','Interstitial Lung Disease and Pulmonary Sarcoidosis','Other Chronic Respiratory Diseases','Total Population']

pca_data = []
pca_normalized_data = []
pca_result = []

pca_first_component_years_separate = []
pca_second_component_years_separate = []

for i in range(0, 16):
    if i < 10:
        exec("pca_data.append((table200" + str(i) + "[pca_attributes]).as_matrix())")
    else:
        exec("pca_data.append((table20" + str(i) + "[pca_attributes]).as_matrix())")
    
    


for i in range(0, 16):

    ''' #Debug and bug to complete the pca
    for k in range(len(pca_data[i])):
        for j in range(len(pca_data[i][k])):
            if not isinstance(pca_data[i][k][j], np.float64):
                #pca_data[i][k][j] = np.float64(pca_data[i][k][j])
                print("NOT ISTANCE")
            if np.isnan(pca_data[i][k][j]):
                pca_data[i][k][j] = 4900000+ (100*i)
                print("NOT ISTANCE", i, k, j)'''
        
    pca_normalized_data.append(preprocessing.StandardScaler().fit_transform(pca_data[i]))
    #pca_result.append(PCA(n_components=17).fit_transform(pca_normalized_data[i]))
    pca_result.append(PCA(n_components=15).fit_transform(pca_normalized_data[i]))
    pca_first_component_years_separate.append(pca_result[i][:,0].tolist())
    pca_second_component_years_separate.append(pca_result[i][:,1].tolist())

'''
print(pca_result[1])
print(pca_result[1][:,0].tolist())
print(pca_result[1][:,1].tolist())'''

'''#Print the covariance matrix to understand the best axes
d_cov=np.cov(pca_result[9].T)
for i in range(len(d_cov)):
    print('Variance transformed data axis Y'+str(i+1),d_cov[i][i])
print('Covariance matrix')
for i in range (len(d_cov)):
    for j in range(len(d_cov[0])):
        print('%.2f ' % (d_cov[i][j]), end='\t')
        #print(str(d_pca[i][j])[:6]+' ', end='')
    print()'''

print('--------------------------------------------')


for i in range(0, 16):
    if i < 10:
        exec("table200" + str(i) + " = pd.DataFrame(data={'Country': countryes, 'CO': co_years_separate[" + str(i) + "], 'CH4': ch4_years_separate[" + str(i) + "], 'NH3': nh3_years_separate[" + str(i) + "], 'NMVOC': nmvoc_years_separate[" + str(i) + "], 'NOx' : nox_years_separate[" + str(i) + "], 'SO2' : so2_years_separate[" + str(i) + "],'PM 10': pm_10_years_separate[" + str(i) + "], 'PM 2.5' : pm_25_years_separate[" + str(i) + "], 'Total Cancer' : df_TC_in_list[" + str(i) + "], 'Air Cancer' : df_AC_in_list[" + str(i) + "], 'Chronic Respiratory Diseases' : df_CRD_in_list[" + str(i) + "], 'Pneumoconiosis' : df_PNE_in_list[" + str(i) + "], 'Asthma' : df_AS_in_list[" + str(i) + "], 'Interstitial Lung Disease and Pulmonary Sarcoidosis' : df_PS_in_list[" + str(i) + "], 'Other Chronic Respiratory Diseases' : df_OCRD_in_list[" + str(i) + "], 'Total Deaths' : df_TD_in_list[" + str(i) + "], 'Total Population' : df_population_in_list[" + str(i) + "], 'PCA first component' : pca_first_component_years_separate[" + str(i) + "], 'PCA second component' : pca_second_component_years_separate[" + str(i) + "]})")
        exec("table200" + str(i) + ".to_csv('dataset/total_merge/200" + str(i) + ".csv', index=False)")
    else:
        exec("table20" + str(i) + " = pd.DataFrame(data={'Country': countryes, 'CO': co_years_separate[" + str(i) + "], 'CH4': ch4_years_separate[" + str(i) + "], 'NH3': nh3_years_separate[" + str(i) + "], 'NMVOC': nmvoc_years_separate[" + str(i) + "], 'NOx' : nox_years_separate[" + str(i) + "], 'SO2' : so2_years_separate[" + str(i) + "],'PM 10': pm_10_years_separate[" + str(i) + "], 'PM 2.5' : pm_25_years_separate[" + str(i) + "], 'Total Cancer' : df_TC_in_list[" + str(i) + "], 'Air Cancer' : df_AC_in_list[" + str(i) + "], 'Chronic Respiratory Diseases' : df_CRD_in_list[" + str(i) + "], 'Pneumoconiosis' : df_PNE_in_list[" + str(i) + "], 'Asthma' : df_AS_in_list[" + str(i) + "], 'Interstitial Lung Disease and Pulmonary Sarcoidosis' : df_PS_in_list[" + str(i) + "], 'Other Chronic Respiratory Diseases' : df_OCRD_in_list[" + str(i) + "], 'Total Deaths' : df_TD_in_list[" + str(i) + "], 'Total Population' : df_population_in_list[" + str(i) + "], 'PCA first component' : pca_first_component_years_separate[" + str(i) + "], 'PCA second component' : pca_second_component_years_separate[" + str(i) + "]})")
        exec("table20" + str(i) + ".to_csv('dataset/total_merge/20" + str(i) + ".csv', index=False)")