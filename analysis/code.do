import excel "C:\Users\Nurlan\Downloads\dataset2022.xlsx", sheet("1") firstrow
describe
summarize
gen Socialsphere = Publichealthandsocialservice+ Publicadministrationanddefens+ Education+ Artentertainmentandrecreatio
summarize Transportandwarehousing Supplyofelectricitygasstea Socialsphere
correlate Transportandwarehousing Supplyofelectricitygasstea Socialsphere GDP Population Unemploymentrate
regress Transportandwarehousing GDP Population Unemploymentrate
regress Supplyofelectricitygasstea GDP Population Unemploymentrate
regress Socialsphere GDP Population Unemploymentrate
histogram Transportandwarehousing , normal title("Распределение: Транспорт") color(blue)
histogram Supplyofelectricitygasstea , normal title("Распределение: Энергетика") color(green)
histogram Socialsphere , normal title("Распределение: Социальная сфера") color(orange)
gen year = 2022
graph bar (mean) Transportandwarehousing Supplyofelectricitygasstea Socialsphere, title("Основные показатели инфраструктуры за 2022 год") ytitle("Средние значения показателей") bar(1, color(navy) lcolor(black) lwidth(medium)) bar(2, color(maroon) lcolor(black) lwidth(medium)) bar(3, color(forest_green) lcolor(black) lwidth(medium)) legend(label(1 "Транспорт и складирование") label(2 "Энергетика") label(3 "Социальная сфера"))
graph bar (mean) Transportandwarehousing Supplyofelectricitygasstea Socialsphere, title("Сравнение показателей по секторам за 2022 год") ytitle("Значения показателей") bar(1, color(blue)) bar(2, color(green)) bar(3, color(orange)) legend(label(1 "Транспорт и складирование") label(2 "Энергетика") label(3 "Социальная сфера")) blabel(bar, size(medium))



