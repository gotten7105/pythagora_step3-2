import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

def get_restaurant_info(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    names = []
    ratings = []
    addresses = []
    restaurant_urls = []
    business_hours = []
    genres = []
    images = []  # 追加
    budgets = []  # 追加
    closed_days = []  # 追加

    restaurants = soup.find_all("div", class_="list-rst__wrap js-open-new-window")
    time.sleep(3)

    for restaurant in restaurants:
        name = restaurant.find("h3", class_="list-rst__rst-name").text.strip()
        rating_tag = restaurant.select_one("p.c-rating--xxl.c-rating--val30.list-rst__rating-total.cpy-total-score span.c-rating__val--strong.list-rst__rating-val")
        rating = float(rating_tag.text.strip()) if rating_tag else None
        # 店舗画像の取得
        image_tag = restaurant.select_one('div.list-rst__photo-item[data-img-index="0"]')
        image_url = image_tag.get("data-original") if image_tag else '画像なし'
        # 予算の取得
        budget_tag = restaurant.select_one('span.c-rating-v3__val')
        budget = budget_tag.text.strip() if budget_tag else '予算なし'
        url_tag = restaurant.find("h3", class_="list-rst__rst-name").find("a", class_="list-rst__rst-name-target cpy-rst-name")
        restaurant_url = url_tag["href"] if url_tag else "URLなし"

        time.sleep(3)

        restaurant_info_page = requests.get(restaurant_url)
        info_soup = BeautifulSoup(restaurant_info_page.text, "html.parser")
        time.sleep(3)

        address_tag = info_soup.select_one('th:-soup-contains("住所") + td p.rstinfo-table__address span:nth-of-type(2)')
        address = address_tag.text.strip() if address_tag else '住所なし'

        business_hours_tag = info_soup.select_one('th:-soup-contains("営業時間") + td p.rstinfo-table__subject-text')
        business_hour_info = business_hours_tag.text.strip() if business_hours_tag else '営業時間なし'
        business_hours.append(business_hour_info)

        genre_tag = info_soup.select_one('th:-soup-contains("ジャンル") + td span')
        genre = genre_tag.text.strip() if genre_tag else 'ジャンルなし'
        genres.append(genre)
        
        # 定休日の取得
        closed_tag = info_soup.select_one('dd#short-comment.rdheader-subinfo__closed-text')
        closed_day = closed_tag.text.strip() if closed_tag else '不定休'

        names.append(name)
        ratings.append(rating)
        addresses.append(address)
        restaurant_urls.append(restaurant_url)
        images.append(image_url)
        budgets.append(budget)
        closed_days.append(closed_day)

    return names, ratings, addresses, business_hours, genres, restaurant_urls, images, budgets, closed_days


def scrape_restaurant_data(base_url, max_pages):
    all_data = {
        "店舗名": [],
        "評価": [],
        "住所": [],
        "営業時間": [],
        "ジャンル": [],
        "店舗URL": [],
        "店舗画像":[],
        "予算":[],
        "定休日":[]
    }

    for page_number in range(1, max_pages + 1):
        page_url = f"{base_url}{page_number}/?LstReserve=0&ChkCard=1&ChkRoomType=5&LstSmoking=0&svd=20240114&svt=1900&svps=2&vac_net=0&LstCosT=7"
        
        names, ratings, addresses, business_hours, genres, restaurant_urls, images, budgets, closed_days = get_restaurant_info(page_url)

        all_data["店舗名"].extend(names)
        all_data["評価"].extend(ratings)
        all_data["住所"].extend(addresses)
        all_data["営業時間"].extend(business_hours)
        all_data["ジャンル"].extend(genres)
        all_data["店舗URL"].extend(restaurant_urls)
        all_data["店舗画像"].extend(images)
        all_data["予算"].extend(budgets)
        all_data["定休日"].extend(closed_days)
        
    return all_data


# ターゲットのURL
base_url = "https://tabelog.com/osaka/C27100/rstLst/cond05-06-00/"
max_pages = 30  # 例として最大5ページまで取得

data = scrape_restaurant_data(base_url, max_pages)

# 取得したデータをデータフレームに変換
df = pd.DataFrame(data)

# データフレームをエクセルに保存
df.to_excel("restaurant_data4.xlsx", index=False)