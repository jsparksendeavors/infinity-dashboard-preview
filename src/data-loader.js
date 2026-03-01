window.InfinityDataLoader = {
  async load(url) {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) throw new Error(`fetch failed: ${r.status}`);
    const data = await r.json();
    // normalize day-grain key
    const rows = (data.rows || []).map(x => ({
      date: x.date,
      leads: Number(x.leads || 0),
      sits: Number(x.sits || 0),
      sold: Number(x.sold || 0),
      bookedRevenue: Number(x.bookedRevenue || 0)
    }));
    return { ...data, rows };
  }
};
